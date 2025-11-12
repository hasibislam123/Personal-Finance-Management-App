import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
   PieChart, Pie, Cell, Tooltip as PieTooltip, Legend as PieLegend,
   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
   AreaChart, Area
} from "recharts";
import { AuthContext } from "../../Contexts/AuthContext";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { HashLoader } from "react-spinners";
import Pleaselogin from "../../assets/please login.svg";

const ACCENT_COLOR = "#00BFA5";
const POSITIVE_COLOR = "#00FF00";
const NEGATIVE_COLOR = "#FF6B6B";
const CARD_BG = "#FFFFFF";
const ACCENT_HEX_COLOR = "#00BFA5";

const COLORS = [ACCENT_COLOR, "#FFBB28", "#AA336A", "#0088FE", "#FF8042", "#00C49F"];

const formatCurrency = (amount) => {
   return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0
   }).format(amount);
};


const calculateNet = (transactions) => {
   const revenue = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + Math.abs(t.amount), 0);
   const costs = transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + Math.abs(t.amount), 0);
   return { revenue, costs, net: revenue - costs };
};

const calculatePercentageChange = (current, previous) => {
   if (previous === 0) {
      return current > 0 ? "+∞%" : "0.0%";
   }
   const change = ((current - previous) / Math.abs(previous)) * 100;
   return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
};

const Reports = () => {
   const { user } = useContext(AuthContext);
   const [transactions, setTransactions] = useState([]);
   const [monthFilter, setMonthFilter] = useState("");
   const [loading, setLoading] = useState(true);

   const MOCK_PREVIOUS_REVENUE = 47250;
   const MOCK_PREVIOUS_COSTS = 12550;

   // fetchTransactions function
   const fetchTransactions = async () => {
      if (!user?.email) {
         setLoading(false);
         return;
      }
      setLoading(true);
      try {
         const res = await axios.get("http://localhost:3000/transactions", {
            params: { email: user.email },
            headers: { Authorization: `Bearer ${user.token}` } // <- token added
         });
         setTransactions(res.data);
      } catch (err) {
         console.error("Error fetching transactions", err);
      } finally {
         setLoading(false);
      }
   };


   useEffect(() => {
      fetchTransactions();
   }, [user?.email]);

   if (loading) {
      return (
         <div style={{  minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <HashLoader color={ACCENT_HEX_COLOR} size={60} />
         </div>
      );
   }
   if (!user?.email && !loading) {
      return (
         <div style={{  minHeight: '100vh', padding: '2rem', textAlign: 'center' }}>
            <img src={Pleaselogin} alt="" />
         </div>
      );
   }

   const filteredTransactions = monthFilter
      ? transactions.filter(t => t.date && t.date.startsWith(monthFilter))
      : transactions;

   const { revenue: currentRevenue, costs: currentCosts } = calculateNet(filteredTransactions);

   const revenueChange = calculatePercentageChange(currentRevenue, MOCK_PREVIOUS_REVENUE);
   const costsChange = calculatePercentageChange(currentCosts, MOCK_PREVIOUS_COSTS);


   const isRevenuePositive = currentRevenue >= MOCK_PREVIOUS_REVENUE;
   const isCostsPositive = currentCosts < MOCK_PREVIOUS_COSTS;

   const categoryTotals = filteredTransactions.reduce((acc, t) => {

      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
   }, {});
   const pieData = Object.keys(categoryTotals).map(key => ({ name: key, value: categoryTotals[key] }));


   const monthlyTotals = transactions.reduce((acc, t) => {
      const month = t.date ? t.date.slice(0, 7) : "Unknown";

      const amount = t.type === 'Expense' ? -t.amount : t.amount;

      acc[month] = (acc[month] || 0) + amount;
      return acc;
   }, {});
   const barData = Object.keys(monthlyTotals).sort().map(month => ({ month, total: monthlyTotals[month] }));
   const waveGraphData = barData.slice(-6);


   const reportsContainerStyle = { padding: '2rem', minHeight: '100vh', color: '#333333', fontFamily: 'Roboto, sans-serif' };
   const cardStyle = { backgroundColor: CARD_BG, borderRadius: '1rem', padding: '1.5rem', width: '100%', maxWidth: '400px', boxShadow: `0 0.5rem 1.5rem rgba(0, 191, 165, 0.1)`, margin: '1.5rem auto', transition: 'transform 0.3s ease', color: '#333' };
   const headerStyle = { display: 'flex', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: `1px solid #EEEEEE` };
   const iconStyle = { fontSize: '1.5rem', color: ACCENT_COLOR, marginRight: '0.75rem', display: 'flex', alignItems: 'center' };
   const dataGridStyle = { display: 'flex', justifyContent: 'space-around', padding: '1rem 0', borderBottom: '1px solid #EEEEEE' };
   const dataItemStyle = { textAlign: 'center', padding: '0 1rem', flex: 1 };
   const valueStyle = { fontSize: '1.8rem', fontWeight: '700', color: '#333333', marginBottom: '0.25rem' };
   const changeStyle = (isPositive) => ({ color: isPositive ? POSITIVE_COLOR : NEGATIVE_COLOR, fontWeight: '600', fontSize: '0.875rem' });
   const fullReportsStyle = { marginTop: '2rem', padding: '1.5rem', backgroundColor: CARD_BG, borderRadius: '1rem', boxShadow: '0 0.5rem 1.5rem rgba(0, 0, 0, 0.1)', color: '#333' };
   const chartsContainerStyle = { display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: '1rem', padding: '1rem 0' };
   const chartBoxStyle = { backgroundColor: '#F9F9F9', padding: '1rem', borderRadius: '0.75rem', margin: '0.5rem', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)', flex: '1 1 300px', minWidth: '300px', color: '#333' };

   const GradientFill = () => (
      <defs>
         <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={ACCENT_COLOR} stopOpacity={0.5} />
            <stop offset="95%" stopColor={ACCENT_COLOR} stopOpacity={0} />
         </linearGradient>
      </defs>
   );


   const FinancialSummaryCard = (
      <div
         style={cardStyle}
         onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
         onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
         <div style={headerStyle}>
            <div style={iconStyle}><FaBangladeshiTakaSign /></div>
            <div style={{ lineHeight: '1.2' }}>
               <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 'normal', color: '#333' }}>Monthly Balance</h3>
               <p style={{ margin: 0, fontSize: '0.75rem', color: '#666' }}>Updated just now</p>
            </div>
         </div>

         <div style={dataGridStyle}>
            <div style={dataItemStyle}>
               <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>Revenue</p>
               <div style={valueStyle}>{formatCurrency(currentRevenue)}</div>
               <div style={changeStyle(isRevenuePositive)}>{revenueChange}</div>
            </div>
            <div style={{ ...dataItemStyle, borderLeft: '1px solid #EEEEEE' }}>
               <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>Costs</p>
               <div style={valueStyle}>{formatCurrency(currentCosts)}</div>
               <div style={changeStyle(isCostsPositive)}>{costsChange}</div>
            </div>
         </div>

         <div style={{ height: '5rem', margin: '1rem 0' }}>
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={waveGraphData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <GradientFill />
                  <Area
                     type="monotone"
                     dataKey="total"
                     stroke={ACCENT_COLOR}
                     strokeWidth={2}
                     fill="url(#waveGradient)"
                     dot={false}
                  />
                  <Area
                     type="monotone"
                     dataKey="total"
                     stroke="none"
                     fill="none"
                     dot={({ cx, cy, index }) => {
                        if (index === waveGraphData.length - 1) {
                           return (
                              <circle
                                 cx={cx}
                                 cy={cy}
                                 r={6}
                                 fill={ACCENT_COLOR}
                                 key={`dot-${index}`}
                                 style={{ filter: `drop-shadow(0 0 4px ${ACCENT_COLOR})` }}
                              />
                           );
                        }
                        return null;
                     }}
                  />
               </AreaChart>
            </ResponsiveContainer>
         </div>
      </div>
   );

   const FullReportsView = (
      <div style={fullReportsStyle}>
         <h2 style={{ color: ACCENT_COLOR, borderBottom: '2px solid #EEEEEE', paddingBottom: '0.5rem' }}>Detailed Financial Reports</h2>

         <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ marginRight: '1rem', fontWeight: 'bold' }}>Select Month: </label>
            <input
               type="month"
               value={monthFilter}
               onChange={e => setMonthFilter(e.target.value)}
               style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc', backgroundColor: '#8d99ae', color: 'black' }}
            />
            <button
               onClick={() => setMonthFilter("")}
               style={{ marginLeft: '0.75rem', padding: '0.5rem 1rem', backgroundColor: ACCENT_COLOR, border: 'none', borderRadius: '0.25rem', cursor: 'pointer', color: 'black', fontWeight: 'bold' }}
            >
               Reset Filter
            </button>
         </div>

         <div style={chartsContainerStyle}>

            <div style={chartBoxStyle}>
               <h3 style={{ color: ACCENT_COLOR }}>Category Totals</h3>
               <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                     <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                     >
                        {pieData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                     </Pie>
                     <PieTooltip
                        contentStyle={{ backgroundColor: CARD_BG, border: '1px solid #ddd', color: '#333', borderRadius: '0.5rem' }}
                        itemStyle={{ color: '#333' }}
                     />
                     <PieLegend layout="horizontal" align="center" verticalAlign="bottom" />
                  </PieChart>
               </ResponsiveContainer>
            </div>

            <div style={chartBoxStyle}>
               <h3 style={{ color: ACCENT_COLOR }}>Monthly Totals (Net)</h3>
               <ResponsiveContainer width="80%" height={300}>
                  <BarChart data={barData} margin={{ top: 20, right: 10, left: 40, bottom: 5 }}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                     <XAxis dataKey="month" stroke="#333" style={{ fontSize: '0.7rem' }} />
                     <YAxis
                        stroke="#333"
                        tickFormatter={formatCurrency}
                     />
                     <Tooltip
                        contentStyle={{ backgroundColor: CARD_BG, border: '1px solid #ddd', color: '#333', borderRadius: '0.5rem' }}
                        itemStyle={{ color: '#333' }}
                        formatter={(value) => formatCurrency(value)}
                     />
                     <Legend />
                     <Bar dataKey="total" fill={ACCENT_COLOR} radius={[5, 5, 0, 0]} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>
   );

   return (
      <div style={reportsContainerStyle}>
         {FinancialSummaryCard}
         {FullReportsView}
      </div>
   );
};

export default Reports;