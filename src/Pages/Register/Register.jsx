export default function Register() {
  return (
    <>
      <section>
        <h2>
          <i className="fa-regular fa-circle-user me-3"></i>
          <span>Register Now</span>
        </h2>

        <form>
          <div>
            <input type="text" placeholder="username" />
          </div>

          <div>
            <input type="email" placeholder="Email" />
          </div>

          <div>
            <input type="tel" placeholder="Phone" />
          </div>

          <div>
            <input type="password" placeholder="password" />
          </div>

          <div>
            <input type="password" placeholder="Re-password" />
          </div>
        </form>
      </section>
    </>
  );
}
