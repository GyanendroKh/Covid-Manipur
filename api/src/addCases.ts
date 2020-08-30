import { districts } from '@covid-manipur/common';
import { connectToMySql, loadEnv } from './utility';
import { Case } from './entity';

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

(async () => {
  const connection = await connectToMySql();

  // await generateFakeData();
  connection.close();
})();
