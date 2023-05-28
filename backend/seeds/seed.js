const { PrismaClient } = require('@prisma/client');
const faker = require('faker');

const prisma = new PrismaClient();

async function seed() {
  try {
    // Delete existing data
    await prisma.commentaire.deleteMany();
    await prisma.article.deleteMany();
    await prisma.categorie.deleteMany();
    await prisma.utilisateur.deleteMany();

    // Create 10 AUTHOR users
    const authorUsers = await Promise.all(
      Array.from({ length: 10 }).map(async () => {
        const user = await prisma.utilisateur.create({
          data: {
            nom: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            role: 'AUTHOR',
          },
        });
        return user;
      })
    );

    // Create 1 ADMIN user
    const adminUser = await prisma.utilisateur.create({
      data: {
        nom: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'ADMIN',
      },
    });

    // Create 10 categories
    const categories = await Promise.all(
      Array.from({ length: 10 }).map(async () => {
        const category = await prisma.categorie.create({
          data: {
            nom: faker.lorem.word(),
          },
        });
        return category;
      })
    );

    // Create 100 articles with random categories and authors
    const articles = await Promise.all(
      Array.from({ length: 100 }).map(async () => {
        const randomCategories = faker.random.arrayElements(
          categories,
          faker.datatype.number({ min: 1, max: 4 })
        );
        const randomAuthorUser = faker.random.arrayElement(authorUsers);

        const article = await prisma.article.create({
          data: {
            titre: faker.lorem.sentence(),
            contenu: faker.lorem.paragraph().slice(0, 10),
            image: faker.image.image(640, 480, true), // Generate a random image URL
            createdAt: new Date(),
            updatedAt: new Date(),
            published: true,
            auteur: {
              connect: {
                id: randomAuthorUser.id,
              },
            },
            categories: {
              connect: randomCategories.map((category) => ({ id: category.id })),
            },
          },
        });

        // Create 0-20 comments for each article
        const commentsCount = faker.datatype.number({ min: 0, max: 20 });
        if (commentsCount > 0) {
          const comments = await Promise.all(
            Array.from({ length: commentsCount }).map(async () => {
              const comment = await prisma.commentaire.create({
                data: {
                  email: faker.internet.email(),
                  contenu: faker.lorem.paragraph().slice(0, 7),
                  article: {
                    connect: {
                      id: article.id,
                    },
                  },
                },
              });
              return comment;
            })
          );
          article.commentaires = comments;
        }

        return article;
      })
    );

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
