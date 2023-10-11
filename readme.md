## პროექტის აღწერა

მოცემული **backend** პროექტი მოიცავს სრულფასოვანი ვებ-გვერდის API-ს, რომელშიც შესულია შემდეგი გვერდები

## გარე გვერდები

*   მთავარი გვერდი
*   კურსების სიის გვერდი
*   კურსის დეტალური გვერდი
*   რეზიუმეების სიის გვერდი
*   რეზიუმეს დეტალური გვერდი
*   გამოწვევების სიის გვერდი
*   გამოწვევის დეტალური გვერდი
*   ქვიზების სია
*   ქვიზის დეტალური გვერდი
*   ბლოგების სიის გვერდი
*   ბლოგის დეტალური გვერდი
*   შეფასებების გვერდი
*   ავტორიზაციის გვერდი
*   რეგისტრაციის გვერდი
*   პაროლის აღდგენის გვერდი

## ადმინისტრატორის გვერდები
ქვემოთ მოცემულია სამართავი პანელის გვერდები, რომლის დახმარებითაც შეგვიძლია განვახორციელოთ **CRUD** ოპერაციები, არსებულ ფუქციონალზე წვდომა შესაძლებელია იმ შემთხვევაში,
თუ `header`-ებში გამოვატანთ `x-auth-token`-ს, ასევე აუცილებელია მომხმარებელი იყოს **ადმინისტრატორის** უფლებებით

*   პროფილის გვერდი
    *   ფოტოს ატვირთვა
    *   ფოტოს წაშლა
*   თეგების მართვა
    *   დამატება
    *   რედაქტირება
    *   წაშლა
*   კატეგორიების მართვა
    *   დამატება
    *   რედაქტირება
    *   წაშლა
*   მომხმარებლების სია (სუპერ ადმინისთვის ჩანს ყველა დარეგისტრირებული მომხმარებელი)
*   ბლოგის მართვა
    *   დამატება
    *   რედაქტირება
    *   წაშლა
*   გამოწვევის მართვა
    *   დამატება
    *   რედაქტირება
    *   წაშლა
*   კურსის მართვა
    *   დამატება
    *   რედაქტირება
    *   წაშლა
*   ქვიზის მართვა
    *   დამატება
    *   რედაქტირება
    *   წაშლა
*   რეზიუმეს მართვა
    *   დამატება
    *   რედაქტირება
    *   წაშლა

## პროექტის გასაშვებად საჭირო ხელსაწყოები

*   [git bash](https://git-scm.com/) (Windows-ის შემთხვევაში) ხოლო Mac-ზე ან Linux-ზე აუცილებელია git-ის ინსტალაცია
*   [nodejs](https://nodejs.org/en)
*   [npm](https://www.npmjs.com/)
*   [mongodb for Windows](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/)
*   [mongodb for Linux](https://www.mongodb.com/docs/manual/administration/install-on-linux/)
*   [mongodb for Mac OS](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/)
*   [mongodb compass](https://www.mongodb.com/products/tools/compass)
*   [nodemon](https://www.npmjs.com/package/nodemon)
*   [postman](https://www.postman.com/)

#### nodemon-ის ინსტალაცია

პროექტის გასაშვებად აუცილებელია დავაინსტალიროდ **nodemon**-ის package შემდეგი ბრძანებით მას შემდეგ რაც დავაინსტალირებთ **nodejs**-ს

```plaintext
npm i -g nodemon
```

## პროექტის ინიციალიზაცია

მას შემდეგ რაც დავაყენებთ ზემოთ არსებულ ხელსაწყოებს, აუცილებელია პრეოქტის მთავარ (root) დირექტორიაში შევქმნათ ახალი ფაილი სახელად `.env` (წინ წერტილი აუცილებელია)

ფაილის შექმნის შემდგომ აუცილებელია მასში ჩავწეროთ ქვემოთ მოცემული კოდი

```plaintext
PRIVATE_KEY=TestUser123
PORT=8000
HOST=http://localhost:4200
CAPTCHA_SECRET_KEY=GOOGLE_RECAPTCHA_KEY
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
MAIL_USER=your_mail@mail.com
MAIL_PASS=your_mail_password
```

`.env` ფაილის შექმნის შემდგომ აუცილებელია პროექტის მთავარი დირექტორიიდან გავუშვათ შემდეგი ბრძანება

```plaintext
npm i
```

მოცემული ბრძანება საშუალებას მოგვცემს დავაინსტალიროთ პროექტის გასაშვებად საჭირო package-ები.

პროექტის გასაშვებად აუცილებელია დაინსტალირებული გვქონდეს ზემოთ ჩამოთვლილი ყველა აპლიკაცია. თუ პროექტის გაშვებას **Windows** ვიზუალ სტუდიო კოდის ინტეგრირებული ტერმინლაით ვცდილობთ აუცილებელია გადავრთოთ ის Git Bash ტერმინალზე, ხოლო თუ თქვენი ოპერაციული სისტემა **Macintosh** ან **Linux**\-ის ნებისმიერი დისტრიბუციაა, პირდაპირ შეგიძლიათ გაუშვათ შემდეგი ბრძანება ტერმინალიდან

```plaintext
nodemon
```

თუ ყველაფერი წარმატებით შეასრულეთ ტერმინალის ფანჯარაში უნდა დაიწეროს შემდეგი ლოგი

```plaintext
Listening on port 8000...
```

#### მთავარი გვერდი
მთავრ გვერდზე ინფორმაციის გამოსატანათ უნდა გამოვიყენოთ get მოთხოვნა შემდეგ მისამართზე
```
http://localhost:8000/api
```