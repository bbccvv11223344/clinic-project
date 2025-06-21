# دليل تشغيل موقع عيادة الدكتور محمد البكاء - زراعة الشعر

## نظرة عامة

هذا الموقع هو تطبيق ويب احترافي متكامل لعيادة زراعة الشعر، مطور باستخدام أحدث التقنيات العالمية. يوفر الموقع تجربة مستخدم متميزة مع دعم PWA (Progressive Web App) وإمكانية التثبيت كتطبيق على الهواتف الذكية.

## التقنيات المستخدمة

### Frontend
- **Next.js 15** - إطار عمل React للتطبيقات الحديثة
- **React 18** - مكتبة JavaScript لبناء واجهات المستخدم
- **TypeScript** - لغة البرمجة مع الأنواع الثابتة
- **Tailwind CSS** - إطار عمل CSS للتصميم السريع
- **Framer Motion** - مكتبة الحركات والانتقالات
- **Zustand** - إدارة الحالة العامة
- **TanStack Query** - إدارة البيانات والتخزين المؤقت
- **NextAuth.js** - نظام المصادقة والتفويض
- **Lucide React** - مكتبة الأيقونات
- **Heroicons** - أيقونات إضافية

### Backend
- **Node.js** - بيئة تشغيل JavaScript
- **NestJS** - إطار عمل Node.js للتطبيقات المؤسسية
- **PostgreSQL** - قاعدة البيانات العلائقية
- **Prisma ORM** - أداة إدارة قاعدة البيانات
- **JWT** - نظام المصادقة بالرموز المميزة
- **bcrypt** - تشفير كلمات المرور
- **class-validator** - التحقق من صحة البيانات

### PWA والتحسينات
- **Service Worker** - للعمل بدون إنترنت
- **Web App Manifest** - لتثبيت التطبيق
- **Push Notifications** - الإشعارات الفورية
- **SEO Optimization** - تحسين محركات البحث

## الميزات الرئيسية

### 1. نظام المصادقة والصلاحيات
- تسجيل دخول وخروج آمن
- إنشاء حسابات جديدة
- أربعة أنواع من المستخدمين:
  - **مريض (PATIENT)** - المستخدم العادي
  - **طبيب (DOCTOR)** - الأطباء المختصين
  - **كادر طبي (MEDICAL_STAFF)** - المساعدين الطبيين
  - **مدير (ADMIN)** - مدير النظام

### 2. الاستشارات الإلكترونية
- إنشاء استشارات جديدة مع الأطباء
- نظام دردشة مباشرة
- إرفاق الملفات والصور
- تتبع حالة الاستشارات
- إشعارات فورية

### 3. معرض النتائج
- عرض نتائج العمليات (قبل وبعد)
- مقارنة تفاعلية للصور
- فلترة حسب نوع العملية
- نظام خصوصية للنتائج
- بحث متقدم

### 4. لوحة التحكم
- إحصائيات شاملة
- إدارة المستخدمين
- إدارة الاستشارات
- إدارة النتائج
- تقارير مفصلة

### 5. PWA (Progressive Web App)
- تثبيت كتطبيق على الهاتف
- العمل بدون إنترنت
- إشعارات فورية
- تجربة مستخدم مماثلة للتطبيقات الأصلية

## هيكل المشروع

```
clinic-project/
├── clinic-frontend/          # تطبيق Frontend
│   ├── src/
│   │   ├── app/              # صفحات التطبيق
│   │   ├── components/       # المكونات المشتركة
│   │   ├── contexts/         # إدارة الحالة
│   │   └── styles/           # ملفات التصميم
│   ├── public/               # الملفات العامة
│   └── package.json
├── clinic-backend/           # تطبيق Backend
│   ├── src/
│   │   ├── auth/             # نظام المصادقة
│   │   ├── users/            # إدارة المستخدمين
│   │   ├── consultations/    # الاستشارات
│   │   ├── results/          # النتائج
│   │   ├── prisma/           # قاعدة البيانات
│   │   └── main.ts
│   └── package.json
└── README.md
```

## متطلبات النظام

### الحد الأدنى
- **نظام التشغيل**: Windows 10/11, macOS 10.15+, Ubuntu 18.04+
- **Node.js**: الإصدار 18.0 أو أحدث
- **PostgreSQL**: الإصدار 12 أو أحدث
- **الذاكرة**: 4 جيجابايت RAM
- **التخزين**: 2 جيجابايت مساحة فارغة

### الموصى به
- **نظام التشغيل**: Windows 11, macOS 12+, Ubuntu 20.04+
- **Node.js**: الإصدار 20.0 أو أحدث
- **PostgreSQL**: الإصدار 15 أو أحدث
- **الذاكرة**: 8 جيجابايت RAM أو أكثر
- **التخزين**: 5 جيجابايت مساحة فارغة
- **المعالج**: معالج رباعي النواة أو أفضل

## تعليمات التثبيت على Windows

### 1. تثبيت المتطلبات الأساسية

#### تثبيت Node.js
1. اذهب إلى [nodejs.org](https://nodejs.org)
2. حمل النسخة LTS (الموصى بها)
3. شغل ملف التثبيت واتبع التعليمات
4. تأكد من التثبيت بفتح Command Prompt وكتابة:
```cmd
node --version
npm --version
```

#### تثبيت PostgreSQL
1. اذهب إلى [postgresql.org](https://www.postgresql.org/download/windows/)
2. حمل PostgreSQL للويندوز
3. شغل ملف التثبيت
4. اختر كلمة مرور قوية لمستخدم postgres
5. احفظ المنفذ الافتراضي 5432

### 2. إعداد قاعدة البيانات

1. افتح pgAdmin أو Command Prompt
2. اتصل بـ PostgreSQL:
```cmd
psql -U postgres
```
3. أنشئ قاعدة البيانات والمستخدم:
```sql
CREATE USER clinic_user WITH PASSWORD 'clinic_password';
CREATE DATABASE clinic_db OWNER clinic_user;
GRANT ALL PRIVILEGES ON DATABASE clinic_db TO clinic_user;
```

### 3. تحميل وإعداد المشروع

1. حمل ملفات المشروع وفك الضغط
2. افتح Command Prompt في مجلد المشروع

#### إعداد Backend
```cmd
cd clinic-backend
npm install
```

3. أنشئ ملف `.env` في مجلد clinic-backend:
```env
DATABASE_URL="postgresql://clinic_user:clinic_password@localhost:5432/clinic_db?schema=public"
JWT_SECRET=your-super-secret-jwt-key-here
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=http://localhost:3000
```

4. شغل migrations قاعدة البيانات:
```cmd
npx prisma migrate dev --name init
npx prisma generate
```

#### إعداد Frontend
```cmd
cd ../clinic-frontend
npm install
```

### 4. تشغيل التطبيق

#### تشغيل Backend
```cmd
cd clinic-backend
npm run start:dev
```
Backend سيعمل على: http://localhost:3001

#### تشغيل Frontend (في نافذة Command Prompt جديدة)
```cmd
cd clinic-frontend
npm run dev
```
Frontend سيعمل على: http://localhost:3000

### 5. الوصول للموقع

افتح المتصفح واذهب إلى: http://localhost:3000

## تعليمات التثبيت على VPS (Ubuntu)

### 1. تحديث النظام
```bash
sudo apt update && sudo apt upgrade -y
```

### 2. تثبيت Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3. تثبيت PostgreSQL
```bash
sudo apt install postgresql postgresql-contrib -y
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 4. إعداد قاعدة البيانات
```bash
sudo -u postgres psql
```
```sql
CREATE USER clinic_user WITH PASSWORD 'clinic_password';
CREATE DATABASE clinic_db OWNER clinic_user;
GRANT ALL PRIVILEGES ON DATABASE clinic_db TO clinic_user;
\q
```

### 5. تثبيت PM2 (لإدارة العمليات)
```bash
sudo npm install -g pm2
```

### 6. رفع ملفات المشروع
استخدم SCP أو FTP لرفع الملفات إلى الخادم

### 7. إعداد المشروع
```bash
cd clinic-backend
npm install
```

أنشئ ملف `.env`:
```bash
nano .env
```
```env
DATABASE_URL="postgresql://clinic_user:clinic_password@localhost:5432/clinic_db?schema=public"
JWT_SECRET=your-super-secret-jwt-key-here
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=http://your-domain.com
```

```bash
npx prisma migrate deploy
npx prisma generate
```

```bash
cd ../clinic-frontend
npm install
npm run build
```

### 8. تشغيل التطبيق مع PM2
```bash
# Backend
cd clinic-backend
pm2 start npm --name "clinic-backend" -- run start:prod

# Frontend
cd ../clinic-frontend
pm2 start npm --name "clinic-frontend" -- start

# حفظ إعدادات PM2
pm2 save
pm2 startup
```

### 9. إعداد Nginx (اختياري)
```bash
sudo apt install nginx -y
```

أنشئ ملف إعداد:
```bash
sudo nano /etc/nginx/sites-available/clinic
```

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/clinic /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## إعداد SSL (HTTPS)

### باستخدام Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

## الصيانة والمراقبة

### مراقبة العمليات
```bash
pm2 status
pm2 logs
pm2 monit
```

### تحديث التطبيق
```bash
# إيقاف التطبيق
pm2 stop all

# تحديث الكود
git pull origin main

# إعادة بناء Frontend
cd clinic-frontend
npm run build

# إعادة تشغيل التطبيق
pm2 restart all
```

### النسخ الاحتياطي لقاعدة البيانات
```bash
pg_dump -U clinic_user -h localhost clinic_db > backup_$(date +%Y%m%d_%H%M%S).sql
```

### استعادة قاعدة البيانات
```bash
psql -U clinic_user -h localhost clinic_db < backup_file.sql
```

## استكشاف الأخطاء

### مشاكل شائعة وحلولها

#### 1. خطأ في الاتصال بقاعدة البيانات
```
Error: P1001: Can't reach database server
```
**الحل:**
- تأكد من تشغيل PostgreSQL
- تحقق من صحة DATABASE_URL في ملف .env
- تأكد من صحة اسم المستخدم وكلمة المرور

#### 2. خطأ في المنافذ
```
Error: listen EADDRINUSE: address already in use :::3000
```
**الحل:**
```bash
# العثور على العملية التي تستخدم المنفذ
netstat -ano | findstr :3000
# إنهاء العملية
taskkill /PID <process_id> /F
```

#### 3. مشاكل في تثبيت الحزم
```
npm ERR! code EACCES
```
**الحل:**
```bash
# تنظيف cache
npm cache clean --force
# إعادة تثبيت
rm -rf node_modules package-lock.json
npm install
```

#### 4. خطأ في Prisma
```
Error: Schema parsing error
```
**الحل:**
```bash
npx prisma generate
npx prisma db push
```

## الأمان

### إعدادات الأمان الموصى بها

1. **تغيير كلمات المرور الافتراضية**
2. **استخدام HTTPS في الإنتاج**
3. **تحديث النظام والحزم بانتظام**
4. **إعداد جدار الحماية**
5. **مراقبة السجلات**

### إعداد جدار الحماية (Ubuntu)
```bash
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw status
```

## الدعم الفني

### معلومات الاتصال
- **المطور**: فريق تطوير العيادة
- **البريد الإلكتروني**: support@clinic-albakaa.com
- **الهاتف**: +964 783 607 1871

### الموارد المفيدة
- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

## الترخيص

هذا المشروع مطور خصيصاً لعيادة الدكتور محمد البكاء. جميع الحقوق محفوظة.

---

**تاريخ آخر تحديث**: ديسمبر 2024
**إصدار الدليل**: 1.0

