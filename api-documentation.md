# API Documentation - عيادة الدكتور محمد البكاء

## نظرة عامة

هذا التوثيق يشرح جميع endpoints المتاحة في API الخاص بموقع عيادة الدكتور محمد البكاء.

**Base URL**: `http://localhost:3001/api`
**الإصدار**: v1.0
**نوع المصادقة**: JWT Bearer Token

## المصادقة (Authentication)

### تسجيل مستخدم جديد
```http
POST /auth/register
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "أحمد",
  "lastName": "محمد",
  "phone": "+964123456789",
  "role": "PATIENT"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clp123456",
    "email": "user@example.com",
    "firstName": "أحمد",
    "lastName": "محمد",
    "role": "PATIENT"
  }
}
```

### تسجيل الدخول
```http
POST /auth/login
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clp123456",
    "email": "user@example.com",
    "firstName": "أحمد",
    "lastName": "محمد",
    "role": "PATIENT"
  }
}
```

### الحصول على الملف الشخصي
```http
GET /auth/profile
Authorization: Bearer {token}
```

**Response:**
```json
{
  "id": "clp123456",
  "email": "user@example.com",
  "firstName": "أحمد",
  "lastName": "محمد",
  "phone": "+964123456789",
  "role": "PATIENT",
  "avatar": null,
  "isActive": true,
  "createdAt": "2024-12-01T10:00:00.000Z"
}
```

## إدارة المستخدمين (Users)

### الحصول على جميع المستخدمين
```http
GET /users
Authorization: Bearer {token}
```

**Query Parameters:**
- `page` (optional): رقم الصفحة (افتراضي: 1)
- `limit` (optional): عدد النتائج (افتراضي: 10)
- `role` (optional): فلترة حسب الدور

**Response:**
```json
{
  "users": [
    {
      "id": "clp123456",
      "email": "user@example.com",
      "firstName": "أحمد",
      "lastName": "محمد",
      "role": "PATIENT",
      "isActive": true,
      "createdAt": "2024-12-01T10:00:00.000Z"
    }
  ],
  "total": 1,
  "page": 1,
  "totalPages": 1
}
```

### الحصول على مستخدم محدد
```http
GET /users/{id}
Authorization: Bearer {token}
```

### تحديث مستخدم
```http
PATCH /users/{id}
Authorization: Bearer {token}
```

**Body:**
```json
{
  "firstName": "أحمد المحدث",
  "phone": "+964987654321"
}
```

### حذف مستخدم
```http
DELETE /users/{id}
Authorization: Bearer {token}
```

## الاستشارات (Consultations)

### الحصول على جميع الاستشارات
```http
GET /consultations
Authorization: Bearer {token}
```

**Query Parameters:**
- `page` (optional): رقم الصفحة
- `limit` (optional): عدد النتائج
- `status` (optional): حالة الاستشارة (ACTIVE, COMPLETED, CANCELLED)

**Response:**
```json
{
  "consultations": [
    {
      "id": "clp789012",
      "title": "استشارة حول زراعة الشعر",
      "description": "أريد معرفة المزيد عن عملية زراعة الشعر",
      "status": "ACTIVE",
      "createdAt": "2024-12-01T10:00:00.000Z",
      "user": {
        "firstName": "أحمد",
        "lastName": "محمد"
      },
      "doctor": {
        "firstName": "د. محمد",
        "lastName": "البكاء"
      }
    }
  ],
  "total": 1,
  "page": 1,
  "totalPages": 1
}
```

### إنشاء استشارة جديدة
```http
POST /consultations
Authorization: Bearer {token}
```

**Body:**
```json
{
  "doctorId": "clp345678",
  "title": "استشارة حول زراعة الشعر",
  "description": "أريد معرفة المزيد عن عملية زراعة الشعر وتكلفتها"
}
```

### الحصول على استشارة محددة
```http
GET /consultations/{id}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "id": "clp789012",
  "title": "استشارة حول زراعة الشعر",
  "description": "أريد معرفة المزيد عن عملية زراعة الشعر",
  "status": "ACTIVE",
  "createdAt": "2024-12-01T10:00:00.000Z",
  "user": {
    "id": "clp123456",
    "firstName": "أحمد",
    "lastName": "محمد"
  },
  "doctor": {
    "id": "clp345678",
    "firstName": "د. محمد",
    "lastName": "البكاء"
  },
  "messages": [
    {
      "id": "clp901234",
      "message": "مرحباً، كيف يمكنني مساعدتك؟",
      "senderId": "clp345678",
      "createdAt": "2024-12-01T10:05:00.000Z"
    }
  ]
}
```

### إضافة رسالة للاستشارة
```http
POST /consultations/{id}/messages
Authorization: Bearer {token}
```

**Body:**
```json
{
  "message": "شكراً لك، أريد معرفة التكلفة",
  "attachments": ["image1.jpg", "image2.jpg"]
}
```

### تحديث حالة الاستشارة
```http
PATCH /consultations/{id}/status
Authorization: Bearer {token}
```

**Body:**
```json
{
  "status": "COMPLETED"
}
```

## النتائج (Results)

### الحصول على جميع النتائج
```http
GET /results
Authorization: Bearer {token}
```

**Query Parameters:**
- `page` (optional): رقم الصفحة
- `limit` (optional): عدد النتائج
- `procedure` (optional): نوع العملية
- `isPublic` (optional): النتائج العامة فقط

**Response:**
```json
{
  "results": [
    {
      "id": "clp567890",
      "title": "زراعة شعر - تقنية FUE",
      "description": "نتيجة ممتازة بعد 6 أشهر",
      "beforeImage": "before_123.jpg",
      "afterImage": "after_123.jpg",
      "procedure": "زراعة الشعر",
      "isPublic": true,
      "createdAt": "2024-12-01T10:00:00.000Z"
    }
  ],
  "total": 1,
  "page": 1,
  "totalPages": 1
}
```

### إضافة نتيجة جديدة
```http
POST /results
Authorization: Bearer {token}
```

**Body (multipart/form-data):**
```
title: زراعة شعر - تقنية FUE
description: نتيجة ممتازة بعد 6 أشهر
procedure: زراعة الشعر
isPublic: true
beforeImage: [file]
afterImage: [file]
```

### الحصول على نتيجة محددة
```http
GET /results/{id}
Authorization: Bearer {token}
```

### تحديث نتيجة
```http
PATCH /results/{id}
Authorization: Bearer {token}
```

### حذف نتيجة
```http
DELETE /results/{id}
Authorization: Bearer {token}
```

## التقييمات (Reviews)

### الحصول على جميع التقييمات
```http
GET /reviews
```

**Response:**
```json
{
  "reviews": [
    {
      "id": "clp234567",
      "rating": 5,
      "comment": "خدمة ممتازة ونتائج رائعة",
      "isPublic": true,
      "createdAt": "2024-12-01T10:00:00.000Z",
      "user": {
        "firstName": "أحمد",
        "lastName": "م."
      }
    }
  ],
  "total": 1,
  "averageRating": 5.0
}
```

### إضافة تقييم جديد
```http
POST /reviews
Authorization: Bearer {token}
```

**Body:**
```json
{
  "rating": 5,
  "comment": "خدمة ممتازة ونتائج رائعة",
  "isPublic": true
}
```

## الخدمات (Services)

### الحصول على جميع الخدمات
```http
GET /services
```

**Response:**
```json
{
  "services": [
    {
      "id": "clp345678",
      "name": "زراعة الشعر بتقنية FUE",
      "description": "أحدث تقنيات زراعة الشعر بدون جراحة",
      "price": 2000,
      "duration": 480,
      "isActive": true,
      "image": "fue_service.jpg"
    }
  ]
}
```

### إضافة خدمة جديدة
```http
POST /services
Authorization: Bearer {token}
```

**Body:**
```json
{
  "name": "زراعة شعر اللحية",
  "description": "زراعة شعر اللحية بتقنيات متطورة",
  "price": 1500,
  "duration": 360,
  "isActive": true
}
```

## رموز الحالة (Status Codes)

- `200` - نجح الطلب
- `201` - تم إنشاء المورد بنجاح
- `400` - خطأ في البيانات المرسلة
- `401` - غير مصرح (مطلوب تسجيل دخول)
- `403` - ممنوع (لا توجد صلاحية)
- `404` - المورد غير موجود
- `500` - خطأ في الخادم

## أمثلة على الاستخدام

### JavaScript/Fetch
```javascript
// تسجيل الدخول
const loginResponse = await fetch('http://localhost:3001/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

const { access_token } = await loginResponse.json();

// الحصول على الاستشارات
const consultationsResponse = await fetch('http://localhost:3001/api/consultations', {
  headers: {
    'Authorization': `Bearer ${access_token}`
  }
});

const consultations = await consultationsResponse.json();
```

### cURL
```bash
# تسجيل الدخول
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# الحصول على الاستشارات
curl -X GET http://localhost:3001/api/consultations \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Python/Requests
```python
import requests

# تسجيل الدخول
login_data = {
    "email": "user@example.com",
    "password": "password123"
}

response = requests.post(
    "http://localhost:3001/api/auth/login",
    json=login_data
)

token = response.json()["access_token"]

# الحصول على الاستشارات
headers = {"Authorization": f"Bearer {token}"}
consultations = requests.get(
    "http://localhost:3001/api/consultations",
    headers=headers
).json()
```

## معالجة الأخطاء

### مثال على رد خطأ
```json
{
  "statusCode": 400,
  "message": "البريد الإلكتروني مطلوب",
  "error": "Bad Request"
}
```

### أخطاء التحقق
```json
{
  "statusCode": 400,
  "message": [
    "البريد الإلكتروني يجب أن يكون صحيحاً",
    "كلمة المرور يجب أن تكون 8 أحرف على الأقل"
  ],
  "error": "Bad Request"
}
```

## الحدود والقيود (Rate Limiting)

- **الحد الأقصى للطلبات**: 100 طلب في الدقيقة لكل IP
- **حجم الملف الأقصى**: 10 ميجابايت للصور
- **أنواع الملفات المدعومة**: JPG, PNG, PDF

## الإصدارات

### v1.0 (الحالي)
- نظام المصادقة الأساسي
- إدارة المستخدمين
- الاستشارات الإلكترونية
- معرض النتائج
- نظام التقييمات

### v1.1 (قادم)
- نظام المواعيد
- مكالمات الفيديو
- الدفع الإلكتروني
- الإشعارات المتقدمة

---

**تاريخ آخر تحديث**: ديسمبر 2024
**إصدار API**: v1.0

