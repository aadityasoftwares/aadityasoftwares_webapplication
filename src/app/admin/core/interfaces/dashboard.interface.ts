export interface IDashboardMetrics {
  summary: {
    totalClients: number;
    totalEnquiries: number;
    newEnquiriesThisMonth: number;
    wonEnquiries: number;
    lostEnquiries: number;
    totalQuotations: number;
    totalInvoices: number;
    paidInvoices: number;
    overdueInvoices: number;
    totalBilled: number;
    totalCollected: number;
    totalOutstanding: number;
  };
  monthlyRevenue?: {
    month: string;
    total: number;
  }[];
  upcomingFollowUps?: any[];
  upcomingTasks?: any[];
  recentActivities?: any[];
}

