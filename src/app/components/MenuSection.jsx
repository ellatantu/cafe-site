import { supabase } from '@/lib/supabase'

async function getMenuData() {
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order')

  const { data: items } = await supabase
    .from('menu_items')
    .select('*')
    .eq('is_available', true)

  return { categories: categories || [], items: items || [] }
}

export default async function MenuSection() {
  const { categories, items } = await getMenuData()

  return (
    <section id="menu" className="py-24 px-6 bg-stone-50 dark:bg-stone-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif-display text-4xl font-bold text-center mb-16 dark:text-white">Our Menu</h2>

        {categories.map((category) => {
          const categoryItems = items.filter((item) => item.category_id === category.id)
          if (categoryItems.length === 0) return null

          return (
            <div key={category.id} className="mb-16">
              <h3 className="font-serif-display text-2xl font-semibold mb-6 text-amber-700 dark:text-amber-500">
                {category.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categoryItems.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-stone-800 rounded-2xl overflow-hidden shadow-md">
                    <img src={item.image_url} alt={item.name} className="w-full h-44 object-cover" />
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-lg dark:text-white">{item.name}</h4>
                        <span className="text-amber-700 dark:text-amber-500 font-semibold">${item.price}</span>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}