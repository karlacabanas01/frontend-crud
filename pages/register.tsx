import RegisterForm from "@/components/RegisterForm";
import Navbar from "@/components/Navbar"; // ✅ Opcional, si tienes un navbar

export default function RegisterPage() {
  return (
    <div>
      <Navbar /> {/* ✅ Agrega un navbar si lo necesitas */}
      <RegisterForm
        toggleForm={() => (window.location.href = "/login")} // ✅ Redirige al login si el usuario ya tiene cuenta
      />
    </div>
  );
}
