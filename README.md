# Memories Project

The Memories Project is a web application featuring a Flask backend and a React.js frontend. This application offers an intuitive interface for users to create, view, and manage their memories interactively. The integration of Flask with React.js ensures a dynamic and engaging experience.

> For an alternative version with Node.js as the backend and React as the frontend, check out [this repo](https://github.com/realsanjeev/Memories-MERN-project).

### Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/realsanjeev/Memories-flask-api-project.git memories-app
   cd memories-app
   ```

2. **Set Up the Server Environment**
   - Rename `.env.example` to `.env` and configure it with your MongoDB Atlas cluster details.
   ```bash
   cd server
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   mv .env.example .env
   ```

3. **Run the Server**
   ```bash
   python app.py
   ```

4. **Set Up the Client**
   - Ensure `nodejs` is installed.
   - Obtain a `GOOGLE CLIENT ID` for Google sign-in and put it in `.env` file. [Get it here](https://console.cloud.google.com/apis/credentials/). 
   ```bash
   cd client
   npm install
   mv .env.example .env
   ```
5. **Run the Client**
   ```bash
   npm start
   ```

## Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to submit a pull request.

## Contact Me

<table>
  <tr>
    <td><img src="https://github.com/realsanjeev/protfolio/blob/main/src/assets/images/instagram.png" alt="Instagram" width="50" height="50"></td>
    <td><img src="https://github.com/realsanjeev/protfolio/blob/main/src/assets/images/twitter.png" alt="Twitter" width="50" height="50"></td>
    <td><img src="https://github.com/realsanjeev/protfolio/blob/main/src/assets/images/github.png" alt="GitHub" width="50" height="50"></td>
    <td><img src="https://github.com/realsanjeev/protfolio/blob/main/src/assets/images/linkedin-logo.png" alt="LinkedIn" width="50" height="50"></td>
  </tr>
</table>

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to modify and enhance this `README.md` as needed to match your specific project details. The provided steps are generic, and you should customize them according to the actual setup and configuration of your "Memories" project.
