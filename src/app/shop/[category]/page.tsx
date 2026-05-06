import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryPageClient from './CategoryPageClient';

const categoryMeta: Record<string, { title: string; description: string; heading: string; sub: string }> = {
  wallets: {
    title: 'Leather Wallets — Pharaoh Collection | AG Store',
    description: 'Shop premium Egyptian-heritage leather wallets. Bifolds, cardholders, money clips crafted with ancient artisan techniques.',
    heading: 'Wallets',
    sub: 'Slim, structured, and story-rich',
  },
  bags: {
    title: 'Luxury Leather Bags | AG Store',
    description: 'Discover handcrafted leather bags — totes, crossbodies, duffels and backpacks. Each piece inspired by Egypt\'s storied legacy.',
    heading: 'Bags',
    sub: 'From dawn to dusk',
  },
  belts: {
    title: 'Heritage Leather Belts | AG Store',
    description: 'Cinch your look with an AG belt. Pharaoh buckles, reversible leather, and hand-stitched craftsmanship.',
    heading: 'Belts',
    sub: 'The finishing flourish',
  },
  'new-arrivals': {
    title: 'New Arrivals — Fresh from the Vault | AG Store',
    description: 'The latest Egyptian-heritage leather goods, freshly added to the AG Store collection.',
    heading: 'New Arrivals',
    sub: 'Fresh from the vault',
  },
};

const validCategories = Object.keys(categoryMeta);

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const meta = categoryMeta[category];
  if (!meta) return { title: 'Not Found' };
  return { title: meta.title, description: meta.description };
}

export async function generateStaticParams() {
  return validCategories.map((cat) => ({ category: cat }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!validCategories.includes(category)) notFound();
  const meta = categoryMeta[category];
  return <CategoryPageClient category={category} heading={meta.heading} sub={meta.sub} />;
}
