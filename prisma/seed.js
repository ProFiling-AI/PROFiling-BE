const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.school.create({
    data: {
      name: '성신여자대학교',
      majors: {
        create: [
          { name: 'AI융합학부' },
          { name: '컴퓨터공학과' },
          { name: '융합보안공학과' }
        ]
      }
    }
  });

  await prisma.school.create({
    data: {
      name: '신성여자대학교',
      majors: {
        create: [{ name: 'AI융합학부' }]
      }
    }
  });

  console.log('샘플 데이터 삽입 완료');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
