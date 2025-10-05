// this is Page for login page

class LoginPage

{


constructor(page)

{
    this.page=page;
    this.userName= page.getByPlaceholder('email@example.com');
    this.passWord= page.getByPlaceholder('enter your passsword');
    this.loginBtn=page.getByRole('button', { name: 'Login' });

}

}