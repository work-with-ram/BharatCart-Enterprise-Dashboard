
import { Product, Order, DashboardStats } from './types';

export interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
  avatar: string;
}

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Banarasi Silk Saree', category: 'Ethnic Wear', price: 12500, stock: 15, status: 'Active', image: 'https://images.unsplash.com/photo-1610030469915-9a88edc1bf60?auto=format&fit=crop&w=400&q=80' },
  { id: '2', name: 'Jaipur Ceramic Vase', category: 'Handicrafts', price: 2499, stock: 42, status: 'Active', image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=400&q=80' },
  { id: '3', name: 'Organic Darjeeling Tea', category: 'FMCG', price: 850, stock: 120, status: 'Active', image: 'https://images.unsplash.com/photo-1594631252845-29fc4586d343?auto=format&fit=crop&w=400&q=80' },
  { id: '4', name: 'Brass Ganesha Idol', category: 'Home Decor', price: 4500, stock: 8, status: 'Active', image: 'https://images.unsplash.com/photo-1567591414240-e26017ec0072?auto=format&fit=crop&w=400&q=80' },
  { id: '5', name: 'Kolhapuri Chappals', category: 'Footwear', price: 1200, stock: 0, status: 'Out of Stock', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=400&q=80' },
  { id: '6', name: 'Lucknowi Chikankari Kurta', category: 'Ethnic Wear', price: 3200, stock: 55, status: 'Active', image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&w=400&q=80' },
  { id: '7', name: 'Ayurvedic Wellness Kit', category: 'Wellness', price: 1850, stock: 200, status: 'Draft', image: 'https://images.unsplash.com/photo-1611073103930-804f32658933?auto=format&fit=crop&w=400&q=80' },
  { id: '8', name: 'Handwoven Ikat Cushion', category: 'Home Decor', price: 650, stock: 90, status: 'Active', image: 'https://images.unsplash.com/photo-1584184924103-e310d9dc85fc?auto=format&fit=crop&w=400&q=80' },
];

export const MOCK_ORDERS: Order[] = [
  { id: '#ORD-IND-101', customer: 'Aarav Sharma', date: '2024-05-15', amount: 15450, status: 'Completed' },
  { id: '#ORD-IND-102', customer: 'Priya Patel', date: '2024-05-16', amount: 2499, status: 'Processing' },
  { id: '#ORD-IND-103', customer: 'Ishan Verma', date: '2024-05-16', amount: 850, status: 'Pending' },
  { id: '#ORD-IND-104', customer: 'Ananya Iyer', date: '2024-05-17', amount: 32500, status: 'Completed' },
  { id: '#ORD-IND-105', customer: 'Vikram Singh', date: '2024-05-17', amount: 1200, status: 'Cancelled' },
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'CUS-IND-01', name: 'Aarav Sharma', email: 'aarav.s@gmail.com', orders: 15, totalSpent: 85000, lastOrder: '2024-05-15', avatar: 'https://i.pravatar.cc/150?u=aarav' },
  { id: 'CUS-IND-02', name: 'Priya Patel', email: 'priya.patel@outlook.in', orders: 4, totalSpent: 12400, lastOrder: '2024-05-16', avatar: 'https://i.pravatar.cc/150?u=priya' },
  { id: 'CUS-IND-03', name: 'Ananya Iyer', email: 'ananya.iyer@tcs.com', orders: 28, totalSpent: 245000, lastOrder: '2024-05-17', avatar: 'https://i.pravatar.cc/150?u=ananya' },
  { id: 'CUS-IND-04', name: 'Rohan Mehra', email: 'rohan.m@yahoo.in', orders: 2, totalSpent: 3500, lastOrder: '2024-05-10', avatar: 'https://i.pravatar.cc/150?u=rohan' },
];

export const MOCK_STATS: DashboardStats = {
  totalRevenue: 2458900,
  totalOrders: 4250,
  totalCustomers: 1840,
  activeProducts: 85,
  revenueGrowth: 18.2,
  orderGrowth: 11.5,
};

export const REVENUE_DATA = [
  { name: 'Jan', revenue: 180000, orders: 450, growth: 12 },
  { name: 'Feb', revenue: 210000, orders: 520, growth: 15 },
  { name: 'Mar', revenue: 350000, orders: 890, growth: 25 },
  { name: 'Apr', revenue: 280000, orders: 610, growth: 18 },
  { name: 'May', revenue: 420000, orders: 1100, growth: 32 },
  { name: 'Jun', revenue: 390000, orders: 950, growth: 28 },
  { name: 'Jul', revenue: 510000, orders: 1250, growth: 35 },
];
