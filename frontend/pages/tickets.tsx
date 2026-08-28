import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import NavigationNew from '../components/NavigationNew';

interface Ticket {
  id: number;
  subject: string;
  message: string;
  status: 'open' | 'answered' | 'closed';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
  replies: Array<{
    id: number;
    message: string;
    is_admin: boolean;
    created_at: string;
  }>;
}

export default function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    message: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Call backend API
    // await createTicket(newTicket);
    
    // Mock: Add ticket
    const ticket: Ticket = {
      id: Date.now(),
      ...newTicket,
      status: 'open',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      replies: [],
    };
    
    setTickets([ticket, ...tickets]);
    setNewTicket({ subject: '', message: '', priority: 'medium' });
    setShowNewTicket(false);
  };

  const handleReply = async (ticketId: number, message: string) => {
    // TODO: Call backend API
    // await replyToTicket(ticketId, message);
    
    // Mock: Add reply
    setTickets(tickets.map(t => 
      t.id === ticketId 
        ? {
            ...t,
            replies: [
              ...t.replies,
              {
                id: Date.now(),
                message,
                is_admin: false,
                created_at: new Date().toISOString(),
              },
            ],
            updated_at: new Date().toISOString(),
          }
        : t
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-500/20 text-blue-400';
      case 'answered': return 'bg-green-500/20 text-green-400';
      case 'closed': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <>
      <Head>
        <title>تیکت‌های پشتیبانی - سابیکس</title>
        <meta name="description" content="مدیریت تیکت‌های پشتیبانی" />
      </Head>

      <div className="min-h-screen bg-black text-white" dir="rtl">
        <NavigationNew />

        <div className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">تیکت‌های پشتیبانی</h1>
                <p className="text-xl text-gray-400">مدیریت درخواست‌های شما</p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowNewTicket(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                + تیکت جدید
              </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tickets List */}
              <div className="lg:col-span-1 space-y-4">
                {tickets.length === 0 ? (
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/10">
                    <div className="text-5xl mb-4">🎫</div>
                    <p className="text-gray-400">تیکتی وجود ندارد</p>
                  </div>
                ) : (
                  tickets.map((ticket) => (
                    <motion.button
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket)}
                      whileHover={{ scale: 1.02 }}
                      className={`w-full text-right bg-white/5 backdrop-blur-xl rounded-2xl p-4 border transition-all ${
                        selectedTicket?.id === ticket.id
                          ? 'border-blue-500'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                          {ticket.status === 'open' && 'باز'}
                          {ticket.status === 'answered' && 'پاسخ داده شده'}
                          {ticket.status === 'closed' && 'بسته'}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority === 'high' && 'فوری'}
                          {ticket.priority === 'medium' && 'عادی'}
                          {ticket.priority === 'low' && 'کم'}
                        </span>
                      </div>
                      <h3 className="font-bold mb-1 line-clamp-1">{ticket.subject}</h3>
                      <p className="text-sm text-gray-400 line-clamp-2 mb-2">{ticket.message}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(ticket.created_at).toLocaleDateString('fa-IR')}
                      </p>
                    </motion.button>
                  ))
                )}
              </div>

              {/* Ticket Detail */}
              <div className="lg:col-span-2">
                {selectedTicket ? (
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
                    {/* Header */}
                    <div className="p-6 border-b border-white/10">
                      <div className="flex items-start justify-between mb-4">
                        <h2 className="text-2xl font-bold">{selectedTicket.subject}</h2>
                        <button
                          onClick={() => setSelectedTicket(null)}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTicket.status)}`}>
                          {selectedTicket.status}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedTicket.priority)}`}>
                          {selectedTicket.priority}
                        </span>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="p-6 max-h-96 overflow-y-auto space-y-4">
                      {/* Original message */}
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                          👤
                        </div>
                        <div className="flex-1">
                          <div className="bg-white/5 rounded-2xl rounded-tr-none p-4">
                            <p className="text-sm">{selectedTicket.message}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(selectedTicket.created_at).toLocaleString('fa-IR')}
                          </p>
                        </div>
                      </div>

                      {/* Replies */}
                      {selectedTicket.replies.map((reply) => (
                        <div key={reply.id} className={`flex gap-3 ${reply.is_admin ? 'flex-row-reverse' : ''}`}>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            reply.is_admin ? 'bg-green-500' : 'bg-blue-500'
                          }`}>
                            {reply.is_admin ? '👨‍💼' : '👤'}
                          </div>
                          <div className="flex-1">
                            <div className={`rounded-2xl p-4 ${
                              reply.is_admin 
                                ? 'bg-green-500/20 rounded-tl-none' 
                                : 'bg-white/5 rounded-tr-none'
                            }`}>
                              <p className="text-sm">{reply.message}</p>
                            </div>
                            <p className={`text-xs text-gray-500 mt-1 ${reply.is_admin ? 'text-left' : 'text-right'}`}>
                              {new Date(reply.created_at).toLocaleString('fa-IR')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Reply Form */}
                    {selectedTicket.status !== 'closed' && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          const message = formData.get('message') as string;
                          if (message.trim()) {
                            handleReply(selectedTicket.id, message);
                            e.currentTarget.reset();
                          }
                        }}
                        className="p-6 border-t border-white/10"
                      >
                        <div className="flex gap-3">
                          <input
                            name="message"
                            placeholder="پیام خود را بنویسید..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                          />
                          <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-all"
                          >
                            ارسال
                          </motion.button>
                        </div>
                      </form>
                    )}
                  </div>
                ) : (
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-12 text-center border border-white/10 h-full flex items-center justify-center">
                    <div>
                      <div className="text-6xl mb-4">💬</div>
                      <p className="text-gray-400">یک تیکت را انتخاب کنید</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* New Ticket Modal */}
        <AnimatePresence>
          {showNewTicket && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowNewTicket(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-8 max-w-2xl w-full"
              >
                <h2 className="text-3xl font-bold mb-6">تیکت جدید</h2>
                
                <form onSubmit={handleCreateTicket} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">موضوع</label>
                    <input
                      type="text"
                      value={newTicket.subject}
                      onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      placeholder="عنوان تیکت..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">اولویت</label>
                    <select
                      value={newTicket.priority}
                      onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value as any })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    >
                      <option value="low">کم</option>
                      <option value="medium">عادی</option>
                      <option value="high">فوری</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">پیام</label>
                    <textarea
                      value={newTicket.message}
                      onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                      rows={6}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                      placeholder="توضیحات کامل مشکل خود را بنویسید..."
                      required
                    />
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                    >
                      ارسال تیکت
                    </motion.button>
                    <button
                      type="button"
                      onClick={() => setShowNewTicket(false)}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
                    >
                      انصراف
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
