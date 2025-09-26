<>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Login</title>
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n    body{\n      margin:0;\n      font-family: Arial, sans-serif;\n      display:flex;align-items:center;justify-content:center;\n      height:100vh;\n      background:linear-gradient(135deg,#60a5fa,#6ee7b7);\n    }\n    .card{\n      background:#fff;\n      padding:30px;\n      border-radius:12px;\n      box-shadow:0 6px 18px rgba(0,0,0,0.15);\n      width:100%;\n      max-width:350px;\n    }\n    h2{text-align:center;margin:0 0 20px;color:#333}\n    form{display:grid;gap:15px}\n    label{font-size:14px;color:#555}\n    input{\n      width:100%;padding:10px;border:1px solid #ccc;border-radius:8px;font-size:14px;\n    }\n    input:focus{border-color:#60a5fa;outline:none;box-shadow:0 0 4px rgba(96,165,250,0.5)}\n    .btn{\n      background:#60a5fa;\n      color:#fff;\n      padding:10px;\n      border:none;\n      border-radius:8px;\n      font-size:16px;\n      cursor:pointer;\n    }\n    .btn:hover{background:#3b82f6}\n    .link{text-align:center;margin-top:10px;font-size:14px}\n    .link a{color:#3b82f6;text-decoration:none}\n    .link a:hover{text-decoration:underline}\n    .error{color:red;font-size:13px;text-align:center;margin-top:10px}\n  "
    }}
  />
  <div className="card">
    <h2>Login</h2>
    <form id="loginForm">
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          required=""
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          required=""
        />
      </div>
      <button type="submit" className="btn">
        Login
      </button>
    </form>
    <div className="link">
      Don’t have an account? <a href="Register.html">Signup</a>
    </div>
    <div id="errorMsg" className="error" />
  </div>
</>
