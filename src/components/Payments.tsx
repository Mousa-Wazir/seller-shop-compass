
import { useState } from "react";
import { DollarSign, CreditCard, TrendingUp, Calendar, Download } from "lucide-react";

const Payments = () => {
  const [paymentHistory] = useState([
    {
      id: 1,
      orderId: "ORD-001",
      productName: "MacBook Pro 16-inch",
      buyerName: "Alice Wilson",
      amount: 2499,
      type: "Sale",
      status: "Completed",
      date: "2024-06-08",
      paymentMethod: "PayPal"
    },
    {
      id: 2,
      orderId: "RNT-002",
      productName: "Canon EOS R Camera",
      buyerName: "Sarah Johnson",
      amount: 245,
      type: "Rental",
      status: "Completed",
      date: "2024-06-01",
      paymentMethod: "Stripe"
    },
    {
      id: 3,
      orderId: "ORD-003",
      productName: "Professional Tripod",
      buyerName: "Carol Davis",
      amount: 120,
      type: "Sale",
      status: "Pending",
      date: "2024-06-05",
      paymentMethod: "Bank Transfer"
    },
    {
      id: 4,
      orderId: "RNT-004",
      productName: "Wireless Gaming Mouse",
      buyerName: "Emma Davis",
      amount: 35,
      type: "Rental",
      status: "Completed",
      date: "2024-06-08",
      paymentMethod: "PayPal"
    }
  ]);

  const totalEarnings = paymentHistory.reduce((sum, payment) => sum + payment.amount, 0);
  const pendingPayments = paymentHistory.filter(p => p.status === "Pending").reduce((sum, payment) => sum + payment.amount, 0);
  const completedPayments = paymentHistory.filter(p => p.status === "Completed").reduce((sum, payment) => sum + payment.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-orange-100 text-orange-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    return type === "Sale" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payments</h1>
        <p className="text-gray-600">Track your earnings, payment history, and manage payment methods.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-green-600">${totalEarnings.toLocaleString()}</p>
            </div>
            <DollarSign className="text-green-500" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-blue-600">${completedPayments.toLocaleString()}</p>
            </div>
            <TrendingUp className="text-blue-500" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-orange-600">${pendingPayments.toLocaleString()}</p>
            </div>
            <Calendar className="text-orange-500" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-purple-600">${(totalEarnings * 0.4).toFixed(0)}</p>
            </div>
            <CreditCard className="text-purple-500" size={24} />
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">
            Add Method
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 flex items-center space-x-3">
            <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">PP</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">PayPal</p>
              <p className="text-sm text-gray-500">seller@example.com</p>
            </div>
            <div className="ml-auto">
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 flex items-center space-x-3">
            <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">BANK</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Bank Transfer</p>
              <p className="text-sm text-gray-500">****1234</p>
            </div>
            <div className="ml-auto">
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Payment History</h2>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{payment.productName}</div>
                      <div className="text-sm text-gray-500">{payment.orderId}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">{payment.buyerName}</td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">${payment.amount.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(payment.type)}`}>
                      {payment.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">{payment.paymentMethod}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden p-4 space-y-4">
          {paymentHistory.map((payment) => (
            <div key={payment.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{payment.productName}</h3>
                  <p className="text-sm text-gray-500">{payment.orderId}</p>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                  {payment.status}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div>
                  <p className="text-lg font-bold text-gray-900">${payment.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{payment.buyerName}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(payment.type)}`}>
                    {payment.type}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">{new Date(payment.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payments;
