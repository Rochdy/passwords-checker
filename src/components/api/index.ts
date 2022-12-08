import api from '../../api';

const port = process.env.PORT || 3000;

api.listen(port, error => {
  if (error) {
    console.log('Error launching the api', error);
    return;
  }

  console.log(`server is listening on ${port}`);
});
