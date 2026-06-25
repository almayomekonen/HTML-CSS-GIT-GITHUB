# 🐳 פרויקט Docker ראשון — אריזת אפליקציית Node ל-Container

> בפרויקט הזה ניקח אפליקציית Node שכבר עובדת (`users-management`),
> ונארוז אותה ל-**container** של Docker — בלי להתקין Node על המחשב!

---

## 🎯 מה נלמד

- מה ההבדל בין **Image** ל-**Container**
- לכתוב **Dockerfile**
- לבנות Image (`docker build`)
- להריץ Container (`docker run`)
- איך מעבירים **פורט** וגם **סודות** ל-container

---

## 🧠 שני מושגים לפני שמתחילים

| מושג | משל מהמטבח | מה זה בפועל |
|------|------------|-------------|
| **Dockerfile** | דף המתכון 📝 | קובץ הוראות לבניית ה-Image |
| **Image** | התבנית הקפואה 🧊 | תבנית לקריאה בלבד, לא רצה |
| **Container** | העוגה החיה 🎂 | מופע *רץ* של ה-Image |

מ-Image אחד אפשר להריץ **הרבה** containers — בדיוק כמו שמתבנית אחת אופים הרבה עוגות.

---

## 📦 דרישה מוקדמת

ודאו ש-Docker מותקן ורץ:

```bash
docker --version
```

אם מקבלים מספר גרסה — מצוין, אפשר להמשיך.

---

## צעד 1️⃣ — מסתכלים על ה-Dockerfile

פתחו את הקובץ `Dockerfile` בתיקייה. עברו על ההערות — כל שורה מוסברת.
בקצרה, מה הוא עושה:

1. `FROM node:20-alpine` — מתחילים מבסיס שכבר מכיל Node
2. `WORKDIR /app` — נכנסים לתיקיית עבודה בתוך ה-container
3. `COPY package*.json ./` + `RUN npm install` — מתקינים חבילות
4. `COPY . .` — מעתיקים את הקוד פנימה
5. `EXPOSE 3000` — מצהירים על הפורט
6. `CMD ["node", "app.js"]` — מריצים את האפליקציה

---

## צעד 2️⃣ — בונים את ה-Image

מהטרמינל, **בתוך תיקיית הפרויקט**, מריצים:

```bash
docker build -t users-management .
```

- `-t users-management` → נותן ל-Image שם ("tag")
- `.` → "ה-Dockerfile נמצא בתיקייה הנוכחית"

צפו ב-Docker בונה שכבה-שכבה. בסוף תראו `naming to ... users-management`.

בדקו שה-Image נוצר:

```bash
docker images
```

---

## צעד 3️⃣ — מריצים את ה-Container

```bash
docker run -p 3000:3000 --env-file .env users-management
```

פירוק הפקודה — **כאן הקסם**:

- `-p 3000:3000` → **מיפוי פורט**: מחבר את פורט 3000 שלך אל פורט 3000 שבתוך ה-container. בלי זה — לא תוכלו להגיע לאפליקציה.
- `--env-file .env` → מעביר את הסודות (סיסמת מסד הנתונים) ל-container **בזמן ריצה**. הם אף פעם לא נשמרו בתוך ה-Image! 🔐
- `users-management` → שם ה-Image שנריץ.

אם הכל טוב תראו:

```
💥 Mongo DB connected successfully 💥
App is running on port 3000
```

> ⚠️ **שימו לב — מלכודת נפוצה:** בקובץ `.env`, אם הערכים עטופים במרכאות
> (למשל `DB_PASSWORD="..."`), הרצה מקומית עובדת אבל `docker --env-file`
> **לא מסיר מרכאות** וייקח אותן כחלק מהסיסמה → שגיאת `bad auth`.
> הפתרון: לכתוב את הערכים ב-`.env` **בלי מרכאות** (`DB_PASSWORD=...`).

---

## צעד 4️⃣ — 🎉 רגע הקסם

פתחו דפדפן בכתובת:

```
http://localhost:3000
```

אתם אמורים לראות:

```
Welcome to our users management app 🧑🏽‍💻
```

האפליקציה רצה **בתוך container מבודד**, מתחברת ל-MongoDB בענן — ולא התקנתם Node במחשב! 🚀

לעצירת ה-container: לחצו `Ctrl + C` בטרמינל.

---

## 🧪 תרגיל לתלמידים

1. שנו את הודעת הברוכים ב-`app.js` (השורה עם `res.send(...)`).
2. בנו מחדש: `docker build -t users-management .`
   👈 שימו לב כמה מהר זה רץ הפעם — בזכות ה-**caching**!
3. הריצו שוב וראו את השינוי בדפדפן.

> 💡 **שאלה לכיתה:** למה ה-build השני היה מהיר בהרבה?
> (רמז: Docker לא התקין מחדש את החבילות כי `package.json` לא השתנה.)

---

## 🛠️ פקודות שימושיות לסיכום

| פקודה | מה היא עושה |
|-------|-------------|
| `docker build -t <שם> .` | בונה Image מ-Dockerfile |
| `docker images` | מציג את כל ה-Images |
| `docker run -p 3000:3000 --env-file .env <שם>` | מריץ Container |
| `docker ps` | מציג Containers שרצים כרגע |
| `docker stop <id>` | עוצר Container |

---

🎓 **כל הכבוד! אריזתם אפליקציה אמיתית ל-Docker.**
