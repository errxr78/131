import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

async function main() {
  // ─── CLEAR EXISTING DATA ──────────────────────────────────────────
  console.log('Cleaning database...');
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.admin.deleteMany();

  // ─── CREATE ADMIN ───────────────────────────────────────────────
  console.log('Creating admin...');
  await prisma.admin.create({
    data: {
      email: 'admin@agstore.com',
      password: 'admin_password_123', // In a real app, hash this!
      name: 'Amr Galal Admin',
    },
  });

  // ─── CREATE CATEGORIES ──────────────────────────────────────────
  console.log('Creating categories...');
  const categoriesData = [
    { name: 'Wallets', slug: 'wallets', description: 'Slim & structured premium wallets' },
    { name: 'Bags', slug: 'bags', description: 'Day to evening luxury bags' },
    { name: 'Belts', slug: 'belts', description: 'Handcrafted heritage belts' },
    { name: 'New Arrivals', slug: 'new-arrivals', description: 'The latest from our royal collection' },
  ];

  const categories = await Promise.all(
    categoriesData.map((cat) =>
      prisma.category.create({
        data: cat,
      })
    )
  );

  const categoryMap = categories.reduce((acc, cat) => {
    acc[cat.slug] = cat.id;
    return acc;
  }, {} as Record<string, string>);

  // ─── CREATE PRODUCTS ────────────────────────────────────────────
  console.log('Creating products...');
  const productsData = [
    {
      name: 'Pharaoh Bifold Wallet',
      price: 1299,
      images: ['/images/product-1.jpg', '/images/product-2.jpeg', '/images/product-3.jpeg'],
      categorySlug: 'wallets',
      stock: 42,
      isFeatured: true,
      description: 'Crafted from full-grain leather with hand-tooled hieroglyphic patterns. The Pharaoh Bifold is a statement of heritage and luxury.',
    },
    {
      name: 'Nile Cardholder',
      price: 649,
      images: ['/images/product-4.jpg'],
      categorySlug: 'wallets',
      stock: 88,
      isFeatured: true,
      description: 'Minimalist slim cardholder inspired by ancient Egyptian papyrus scrolls.',
    },
    {
      name: 'Anubis Leather Tote',
      price: 3499,
      images: ['/images/product-7.jpg', '/images/product-8.jpg', '/images/product-9.jpg'],
      categorySlug: 'bags',
      stock: 15,
      isFeatured: true,
      description: 'Our flagship structured tote, hand-stitched with iconic Anubis silhouette hardware.',
    },
    {
      name: 'Pharaoh Gold Buckle Belt',
      price: 899,
      images: ['/images/product-4.jpg'],
      categorySlug: 'belts',
      stock: 78,
      isFeatured: true,
      description: 'Premium full-grain leather belt with 24-karat gold-plated pharaoh head buckle.',
    },
  ];

  for (const product of productsData) {
    await prisma.product.create({
      data: {
        name: product.name,
        slug: slugify(product.name),
        price: product.price,
        images: product.images,
        description: product.description,
        stock: product.stock,
        isFeatured: product.isFeatured,
        categoryId: categoryMap[product.categorySlug],
      },
    });
  }

  console.log('Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
