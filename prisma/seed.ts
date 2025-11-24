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
      description: "During Plebe Summer we will take over 250,000 photographs each platoon at least 15 times. The photographs are organized into galleries, identified by date, platoon and evolution (event). There are two methods for finding photographs of your son/daughter. They are Manual search and Waldo Finder.",
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

  const eventCategoriesEvents = [
    {
      categoryId: 1,
      title: "PhotoGraphs of Herndon Monument Climb",
      slug: "photo-graphs-of-herndon-monument-climb",
      description: "You are purchasing access to the photographs we will take of the Herndon Monument Climb and Sea Trials. Purchase includes unlimited downloads of your midshipman for personal use. We are not able to photograph every midshipman during Herndon, but we are during Sea Trials. During Sea Trials we photograph each company as they complete one of the events —the Mud Crawl.",
      imageUrl: "",
      price: 29.95,
      status: true,
    },
    {
      categoryId: 2,
      title: "PhotoGraphs of Graduations / Commissioning",
      slug: "photo-graphs-of-graduations-commissioning",
      description: "You are purchasing access to the photographs we take during  Graduation/Commissioning. May 22, 2026. With four cameras and locations on the field to the left and right of the stage, we take over 20,000 photographs. We photograph every graduate during the processional, shaking hands and leaving the stage. And, using 'burst'  photography we take multiple photographs. No need to provide your grads name and company. We photograph every graduate. The photographs are grouped in galleries that are identified by company. Just open up the gallery and find your son/daughter. Unlimited downloads. Use 'Grad Finder, ' our proprietary Facial Recognition program, to find your son/daughter quickly. 'Grad Finder' is free and is not perfect so you will need still to search the galleries. But, it is fun. Most of the ceremony is photographed, from the Jumbotron image to the faculty processional, Graduates in their seats, Oaths of Office, Navy Blue and Gold, Speeches, Cap Toss, etc. Just find and download the photographs of your son/daughter to create your own Commissioning Week Coffee Table Book on Shutterfly, etc.",
      imageUrl: "",
      price: 59.95,
      status: true,
    },
    {
      categoryId: 3,
      title: "Manual Seach",
      slug: "manual-search",
      description: "With Manual Search the website defaults to your midshipman's platoon, with option to view other platoon galleries. When you find photographs of your son/daughter, you manually download them (up to 250) to you computer/mobile device. You will have the option to download more.",
      imageUrl: "",
      price: 269.95,
      status: true,
    },
    {
      categoryId: 3,
      title: "Manual Seach with Waldo Finder and Waldo News",
      slug: "manual-search-with-waldo-finder-and-waldo-news",
      description: "With Manual Search and Waldo Finder, you can set up Waldo Finder to Automatically find photographs of your son/daughter as they are posted. When Waldo Finder find your midshipman,you will be sent a text and/or email notification. You will also give access to Manual Search for those photographs that Waldo Finder did not find.",
      imageUrl: "",
      price: 349.95,
      status: true,
    },
  ];
  for (const event of eventCategoriesEvents) {
    await prisma.event.upsert({
      where: { slug: event.slug },
      update: {},
      create: event,
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
