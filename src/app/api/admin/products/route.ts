import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase (User needs to add these to .env)
const getSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    return null;
  }
  
  return createClient(supabaseUrl, supabaseKey);
};

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

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const stock = parseInt(formData.get('stock') as string);
    const categoryId = formData.get('categoryId') as string;
    const isFeatured = formData.get('isFeatured') === 'on';
    
    const imageFiles = formData.getAll('product_images') as File[];
    const imageUrls: string[] = [];

    // ─── UPLOAD IMAGES TO SUPABASE ──────────────────────────────────
    const supabase = getSupabase();
    
    if (supabase) {
      for (const file of imageFiles) {
        const fileName = `${Date.now()}-${file.name}`;
        const { error } = await supabase.storage
          .from('product-images')
          .upload(fileName, file);
        
        if (error) {
          console.error('Supabase Upload Error:', error);
          continue;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);
        
        imageUrls.push(publicUrl);
      }
    } else {
      // Fallback if no supabase keys (for testing UI)
      imageUrls.push('/images/product-1.jpg');
    }

    // ─── SAVE TO DATABASE ──────────────────────────────────────────
    const product = await prisma.product.create({
      data: {
        name,
        slug: slugify(name),
        description,
        price,
        stock,
        isFeatured,
        categoryId,
        images: imageUrls,
      }
    });

    return NextResponse.json(product);
  } catch (error: unknown) {
    console.error('Create Product Error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
