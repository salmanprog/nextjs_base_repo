import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminRole = await prisma.userRole.upsert({
    where: { slug: "admin" },
    update: {},
    create: {
      title: "Administrator",
      slug: "admin",
      description: "Full system access",
      type: "ADMIN",
      isSuperAdmin: true,
      status: true,
    },
  });

  const userRole = await prisma.userRole.upsert({
    where: { slug: "user" },
    update: {},
    create: {
      title: "User",
      slug: "user",
      description: "Regular user access",
      type: "USER",
      isSuperAdmin: false,
      status: true,
    },
  });

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await prisma.user.upsert({
    where: { email: "admin@thornton.com" },
    update: {},
    create: {
      name: "Super Admin",
      username: "superadmin",
      slug: "super-admin",
      email: "admin@thornton.com",
      password: hashedPassword,
      userGroupId: adminRole.id,
      userType: "ADMIN",
      gender: "MALE",
      profileType: "PUBLIC",
      status: true,
      isEmailVerify: true,
    },
  });

  const eventCategories = [
    {
      name: "Sea Trials / Herndon",
      slug: "sea-trials-herndon",
      description: "All sea related events",
      imageUrl: "/uploads/category/sec-02.png",
    },
    {
      name: "Graduations / Commissioning",
      slug: "graduations-commissioning",
      description: "Graduations celebration events",
      imageUrl: "/uploads/category/sec-03.png",
    },
    {
      name: "Plebe Summer",
      slug: "plebe-summer",
      description: "Plebe events",
      imageUrl: "/uploads/category/sec-04.png",
    },
    {
      name: "Studio Collection",
      slug: "studio-collection",
      description: "Studio Collection",
      imageUrl: "/uploads/category/sec-05.png",
    },
  ];

  for (const cat of eventCategories) {
    await prisma.eventCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  
  console.log("✅ Seed completed successfully");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
