export default function Footer() {
  return (
    <footer className="bg-stone-900 text-gray-300 py-16 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
         <h3 className="font-serif-display text-xl font-bold text-white mb-3">Northstar Café</h3> 
          <p className="text-sm text-gray-400">A warm, welcoming space for great coffee and good conversation.</p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Visit Us</h4>
          <p className="text-sm text-gray-400">123 Coffee Street, Addis Ababa</p>
          <p className="text-sm text-gray-400 mt-2">Mon–Fri: 7am–6pm</p>
          <p className="text-sm text-gray-400">Sat–Sun: 8am–5pm</p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Follow Us</h4>
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-amber-500 transition">Instagram</a>
            <a href="#" className="hover:text-amber-500 transition">Facebook</a>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto border-t border-gray-700 mt-10 pt-6 text-center text-xs text-gray-500">
        &copy; 2026 Northstar Café. All rights reserved.
      </div>
    </footer>
  )
}