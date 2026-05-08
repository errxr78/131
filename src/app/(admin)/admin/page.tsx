import React from 'react';
import { 
  ShoppingCart, 
  Package, 
  Users,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign
} from 'lucide-react';

const StatCard = ({ label, value, trend, icon: Icon, color }: { label: string; value: string | number; trend?: number; icon: React.ElementType; color: string }) => (
  <div className="bg-[#0c0a06] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-accent-primary/30 transition-all duration-500">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-5 rounded-full ${color}`} />
    
    <div className="flex justify-between items-start relative z-10 mb-4">
      <div className={`p-3 rounded-xl bg-white/5 text-white group-hover:bg-accent-primary group-hover:text-white transition-colors duration-500`}>
        <Icon size={20} />
      </div>
      {trend && (
        <span className={`flex items-center text-[10px] font-bold ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend > 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {Math.abs(trend)}%
        </span>
      )}
    </div>

    <p className="text-neutral-500 uppercase tracking-widest text-[10px] font-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
      {label}
    </p>
    <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
      {value}
    </h3>
  </div>
);

export default function AdminPage() {
  return (
    <div className="space-y-10">
      {/* ─── STATS GRID ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Revenue" 
          value="EGP 124,500" 
          trend={12.5} 
          icon={DollarSign} 
          color="bg-accent-primary"
        />
        <StatCard 
          label="Orders" 
          value="482" 
          trend={8.2} 
          icon={ShoppingCart} 
          color="bg-blue-500"
        />
        <StatCard 
          label="Active Products" 
          value="24" 
          trend={-2.4} 
          icon={Package} 
          color="bg-orange-500"
        />
        <StatCard 
          label="Total Customers" 
          value="1,204" 
          trend={14.8} 
          icon={Users} 
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table Mock */}
        <div className="lg:col-span-2 bg-[#0c0a06] border border-white/5 rounded-2xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-display)' }}>Recent Orders</h3>
            <button className="text-[10px] font-bold uppercase tracking-widest text-accent-primary hover:text-white transition-colors">View All</button>
          </div>
          
          <div className="space-y-4">
            {[
              { id: '#ORD-2024-001', customer: 'Ahmed Ali', amount: 'EGP 2,499', status: 'Delivered' },
              { id: '#ORD-2024-002', customer: 'Mona Salem', amount: 'EGP 1,299', status: 'Processing' },
              { id: '#ORD-2024-003', customer: 'Karim Zayed', amount: 'EGP 899', status: 'Pending' },
              { id: '#ORD-2024-004', customer: 'Sara Hassan', amount: 'EGP 3,499', status: 'Shipped' },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary font-bold text-xs">
                    {order.customer.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{order.customer}</p>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-tighter">{order.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{order.amount}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${
                    order.status === 'Delivered' ? 'text-green-400' : 
                    order.status === 'Processing' ? 'text-blue-400' : 
                    order.status === 'Pending' ? 'text-orange-400' : 'text-purple-400'
                  }`}>
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Status Mock */}
        <div className="bg-[#0c0a06] border border-white/5 rounded-2xl p-8">
          <h3 className="text-lg font-bold uppercase tracking-widest mb-8" style={{ fontFamily: 'var(--font-display)' }}>Low Stock</h3>
          <div className="space-y-6">
            {[
              { name: 'Anubis Tote', stock: 2, img: '/images/product-7.jpg' },
              { name: 'Horus Duffel', stock: 4, img: '/images/product-2.jpeg' },
              { name: 'Pharaoh Bifold', stock: 5, img: '/images/product-1.jpg' },
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-4">
                <img src={item.img} className="w-12 h-12 rounded-lg object-cover border border-white/5" alt="" />
                <div className="flex-1">
                  <p className="text-sm font-bold">{item.name}</p>
                  <div className="w-full bg-white/5 h-1 rounded-full mt-2 overflow-hidden">
                    <div className="bg-red-500 h-full" style={{ width: `${(item.stock / 20) * 100}%` }} />
                  </div>
                </div>
                <p className="text-xs font-bold text-red-400">{item.stock} left</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
