# Car Rental & Servicing System

<p align="center">
<img src="https://github.com/FalconiZzare/car_management_lab/blob/master/client/src/assets/logo.png?raw=true" alt="drawing" width="200"/>
</p>

### Please follow the below guidelines to install and run the project. Thank you.

### Installing Dependencies

- Download & install [**Powershell 7**](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.4#installing-the-msi-package). Follow all the default settings while installing. You can skip this if you are running Windows 11.

- Download & install [**XAMPP**](https://www.apachefriends.org/).

- Download & install [**Node.js LTS**](https://nodejs.org/en). Follow all the default settings while installing. No need to install `Chocolatey`.

### Preparing Environment

- Go inside the `car_management` folder and then inside the `server` folder. Create a new folder here named `images` with all lower case letters.

- Open `XAMPP` and start **Apache** & **MySQL**. Make sure you did not modify credentials for root user in XAMPP MySQL settings because the project uses root user with a blank password to access database.

- Click on **Admin** next to **MySQL** and go to `Import` from the webpage that opened. Click on **Choose file** and browse to the project folder (**car_management**) in your pc. From project folder go inside server folder, then go to **queries** folder and from there select `initialize_database.sql`. After that click **import** button and if everything is okay with your XAMPP instance this will create database schema for the whole project.

### Running The Project

Go to the project folder. Go inside the **client** folder. Right-click on an empty space and select `Open in Terminal`. If you do not see this option, Hover over `Powershell 7` and then select `Open here`. Then run the following command:

```sh
npm install
```

Please do not panic if it takes time during first install. After installing is done, close the terminal and go back to project root and now go inside **server** folder. Run the same command again as above following the same instructions. Don't close the terminal after installation. Instead, after done, run the following command: 

```sh
npm run dev
```

If you did everything right, this should run both front-end and backend at the same time, and you will be able to view the website on `http://localhost:5173`

Login using the below credentials and start exploring:

- `Username`: **falconizzare**
- `Password`: **123456**

