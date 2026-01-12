
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'Active' | 'Draft' | 'Out of Stock';
  image: string;
}

export interface Order {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: 'Completed' | 'Processing' | 'Pending' | 'Cancelled';
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  activeProducts: number;
  revenueGrowth: number;
  orderGrowth: number;
}

export interface InsightReport {
  summary: string;
  recommendations: string[];
  trendingCategories: string[];
}
