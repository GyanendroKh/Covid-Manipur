import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import { json } from 'body-parser';
import { createConnection, getRepository } from 'typeorm';
import { Total, TimelineData, CaseTypeData } from '@covid-manipur/common';
import { Case } from './entity';
import { IS_PROD } from './constant';

dotenv.config({
  debug: !IS_PROD,
  path: IS_PROD ? '.env' : '.env.local'
});

const app = express();
const PORT = process.env.PORT || 9090;

(async () => {
  await createConnection({
    type: 'mysql',
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    entities: [Case]
  });

  app.use(json());

  app.get('/case/total', async (_, res) => {
    const result = await getRepository(Case)
      .createQueryBuilder('c')
      .select(
        ['confirmed', 'death', 'recovered']
          .map(s => `SUM(c.${s}) as ${s}`)
          .join(', ')
      )
      .limit(1)
      .getRawOne();

    const [confirmed, death, recovered] = [
      result.confirmed,
      result.death,
      result.recovered
    ].map(Number);

    const data: Total = {
      confirmed,
      death,
      recovered,
      active: confirmed - (death + recovered)
    };

    res.json(data);
  });

  app.get('/case/timeline', async (_, res) => {
    const dates = Array(7)
      .fill(0)
      .map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);

        return date.toDateString();
      });

    const result = await getRepository(Case)
      .createQueryBuilder('c')
      .select()
      .where(`c.date IN (:...dates)`, { dates })
      .getMany();

    const data: TimelineData[] = Array.from(
      result.reduce((acc, v) => {
        let count = {
          confirmed: v.confirmed,
          death: v.death,
          recovered: v.recovered
        };

        const old = acc.get(v.date);
        if (old !== undefined) {
          count = {
            confirmed: count.confirmed + old.confirmed,
            death: count.death + old.death,
            recovered: count.recovered + old.recovered
          };
        }

        acc.set(v.date, count);

        return acc;
      }, new Map<string, Omit<TimelineData, 'date'>>())
    ).map(([date, values]) => {
      return {
        date,
        ...values
      };
    });

    res.json(data);
  });

  app.get('/case/:type', async (req, res) => {
    const type = req.params.type;

    if (!['confirmed', 'death', 'recovered'].find(t => t === type.trim())) {
      res.json();
    }

    const innerQueries = Array.from({ length: 8 }, (_, k) => k + 1).map(i => {
      return `(SELECT SUM(${type}) FROM \`case\` WHERE district = ${i} LIMIT 1) as '${i}'`;
    });

    const result = await getRepository(Case)
      .createQueryBuilder('c')
      .select(innerQueries.join(', '))
      .limit(1)
      .getRawOne();

    const data: CaseTypeData = {};

    Object.keys(result).forEach(k => {
      data[k] = Number(result[k]);
    });

    res.json(data);
  });

  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
})().catch(console.log);
