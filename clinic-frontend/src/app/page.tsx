'use client';

import { motion } from 'framer-motion';
import { 
  UserGroupIcon, 
  HeartIcon, 
  StarIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { 
  CheckCircleIcon,
  PlayCircleIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import Image from 'next/image';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">م</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">عيادة الدكتور محمد البكاء</h1>
                <p className="text-sm text-gray-600">التخصصية لزراعة الشعر</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8 space-x-reverse">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">الرئيسية</Link>
              <Link href="/services" className="text-gray-700 hover:text-blue-600 font-medium">الخدمات</Link>
              <Link href="/results" className="text-gray-700 hover:text-blue-600 font-medium">النتائج</Link>
              <Link href="/consultation" className="text-gray-700 hover:text-blue-600 font-medium">استشارة</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">عن العيادة</Link>
            </nav>
            <div className="flex space-x-4 space-x-reverse">
              <Link href="/login" className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                تسجيل الدخول
              </Link>
              <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                إنشاء حساب
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp}>
              <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
                استعد ثقتك بنفسك مع
                <span className="text-blue-600 block">زراعة الشعر الطبيعي</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                نحن نقدم أحدث تقنيات زراعة الشعر بأيدي خبراء متخصصين لضمان أفضل النتائج الطبيعية
              </p>
              <div className="flex space-x-4 space-x-reverse">
                <Link href="/consultation" className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-lg">
                  احجز استشارة مجانية
                </Link>
                <button className="px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-lg flex items-center">
                  <PlayCircleIcon className="w-6 h-6 ml-2" />
                  شاهد الفيديو
                </button>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <UserGroupIcon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">5000+</h3>
                    <p className="text-gray-600">عملية ناجحة</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <HeartIcon className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">98%</h3>
                    <p className="text-gray-600">نسبة الرضا</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <StarIcon className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">15+</h3>
                    <p className="text-gray-600">سنة خبرة</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircleIcon className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">100%</h3>
                    <p className="text-gray-600">ضمان النتائج</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">خدماتنا المتخصصة</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نقدم مجموعة شاملة من الخدمات المتخصصة في زراعة الشعر وعلاج تساقط الشعر
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: "زراعة الشعر بتقنية FUE",
                description: "أحدث تقنيات زراعة الشعر بدون جراحة مع نتائج طبيعية 100%",
                icon: "🌱",
                color: "blue"
              },
              {
                title: "زراعة شعر اللحية والشارب",
                description: "تقنيات متطورة لزراعة شعر الوجه بشكل طبيعي ومتناسق",
                icon: "🧔",
                color: "green"
              },
              {
                title: "علاج تساقط الشعر",
                description: "برامج علاجية متكاملة لوقف تساقط الشعر وتحفيز النمو",
                icon: "💊",
                color: "purple"
              }
            ].map((service, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link href="/services" className={`inline-flex items-center text-${service.color}-600 hover:text-${service.color}-700 font-medium`}>
                  اعرف المزيد
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">تواصل معنا</h2>
            <p className="text-xl text-gray-600">نحن هنا للإجابة على جميع استفساراتك</p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PhoneIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">اتصل بنا</h3>
              <p className="text-gray-600">+964 783 607 1871</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPinIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">العنوان</h3>
              <p className="text-gray-600">النجف، العراق</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">ساعات العمل</h3>
              <p className="text-gray-600">السبت - الخميس: 9:00 - 18:00</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">عيادة الدكتور محمد البكاء</h3>
              <p className="text-gray-300">
                عيادة متخصصة في زراعة الشعر وعلاج تساقط الشعر بأحدث التقنيات العالمية
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">الخدمات</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/services" className="hover:text-white">زراعة الشعر</Link></li>
                <li><Link href="/services" className="hover:text-white">علاج التساقط</Link></li>
                <li><Link href="/services" className="hover:text-white">زراعة اللحية</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">روابط مهمة</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/about" className="hover:text-white">عن العيادة</Link></li>
                <li><Link href="/results" className="hover:text-white">النتائج</Link></li>
                <li><Link href="/consultation" className="hover:text-white">استشارة</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">تواصل معنا</h4>
              <div className="space-y-2 text-gray-300">
                <p>+964 783 607 1871</p>
                <p>النجف، العراق</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 عيادة الدكتور محمد البكاء. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

