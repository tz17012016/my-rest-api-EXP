import fileUpload from 'express-fileupload';
import indexRouter from './indexRoutes.js';
import uploadRouter from './uploadRoutes.js';
import usersRouter from './userRoutes.js';
import cardsRouter from './cardsRoutes.js';


export const routesInit = (app) => {
  app.use('/', indexRouter);
  app.use('/api/upload', uploadRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/cards', cardsRouter);

 
  app.use((req, res) => {
    res.status(404).json({ msg: '404 url page not found' });
  });
};

export const fileUploadAccess = (app) => {
    app.use(
    fileUpload({
       limits: { fileSize: 5 * (1024 * 1024) },
    })
  );
};

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
