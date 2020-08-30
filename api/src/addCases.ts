import { districts } from '@covid-manipur/common';
import { connectToMySql, loadEnv } from './utility';
import { Case } from './entity';
import fs from 'fs/promises';
import path from 'path';

loadEnv();

const generateFakeData = async () => {
  const cases: Array<Case[]> = Array(7)
    .fill(0)
    .map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);

      return date.toDateString();
    })
    .map(date => {
      return districts.map((_, i) => {
        return Case.create({
          date,
          district: i,
          confirmed: Math.trunc(Math.random() * 10),
          death: Math.trunc(Math.random() * 5),
          recovered: Math.trunc(Math.random() * 8)
        } as Case);
      });
    });

  for (const i of cases) {
    for (const j of i) {
      await j.save();
      console.log(j);
    }
  }
};

const addCases = async () => {
  const pathToJSON = path.join(__dirname, '..', 'data.json');

  const cases: Case[] = JSON.parse((await fs.readFile(pathToJSON)).toString());

  for (const i of cases) {
    await i.save();
    console.log(i);
  }
};

(async () => {
  const connection = await connectToMySql();

  try {
    await addCases();
  } catch (e) {
    console.log(e);
  }

  // await generateFakeData();
  connection.close();
})();
