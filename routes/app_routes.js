import fileUpload from 'express-fileupload';
import indexRouter from './indexRoutes.js';
import uploadRouter from './uploadRoutes.js';
import usersRouter from './userRoutes.js';
import cardsRouter from './cardsRoutes.js';

// app -> express עצמו
export const routesInit = (app) => {
  app.use('/', indexRouter);
  app.use('/api/upload', uploadRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/cards', cardsRouter);

  // במקרה שהגענו לעמוד שלא קיים
  app.use((req, res) => {
    res.status(404).json({ msg: '404 url page not found' });
  });
};

export const fileUploadAccess = (app) => {
  // מגדיר שניתן לשלוח קבצים ולעלות לשרת
  // ומגדיר את המגבלה המקסימילית של משקל של קובץ
  app.use(
    fileUpload({
      // 1024 BYTES = 1 KB
      // 1024 KB = 1 MB
      // במקרה שלנו הגבלנו את המשקל המרבי של הקבצים ל 5 מב
      // עדיין צריך לבדוק בראוט שמקבל את הקובץ
      // שהוא לא שוקל מעל 5 מב כי ההגבלה שבשורה למטה
      // רק תגביל שהמשקל המקסימלי שיעלה לשרת יהיה 5 מב
      limits: { fileSize: 5 * (1024 * 1024) },
    })
  );
};

// להגדיר CORS-ORIGIN שיאפשר כניסה מכל דומיין
// או כל דומיין שנגדיר
export const originCorsAccess = (app) => {
  app.all('*', (req, res, next) => {
    if (!req.get('Origin')) return next();
    res.set('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.set(
      'Access-Control-Allow-Headers',
      'X-Requested-With,Content-Type,x-auth-token'
    );
    next();
  });
};
