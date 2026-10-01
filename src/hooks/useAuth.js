// src/hooks/useAuth.js
// Equivalente al useIniciarSesion.js de Next.js
import { useContext } from "react";
import { toast } from "sonner";
import { AppContext } from "@/context/AppContext.js";
import usePropiedades from "@/hooks/usePropiedades";
import useResetForm from "./useResetForm";
import { validatePasswordRegistro } from "@/utils/validatePassword";
import { useRouter } from "next/navigation";
import { apiBackend } from "@/actions/apiBackend";
import { buildLoginUrl, getSafeNext } from "@/utils/authRedirect.js";

const useAuth = () => {
  const {
    formDataUsuario,
    setFormDataUsuario,
    resetFormDataUsuario,
    guardarSesion,
    cerrarSesion,
    setLoadingAuth,
    iniciarCarga,
    terminarCarga,
  } = useContext(AppContext);
  const { limpiarPropiedades } = usePropiedades();
  const { resetFormDataPropiedad } = useResetForm();

  const router = useRouter();

  // ─────────────────────────────────────────────
  // Manejar cambios en el formulario
  // ─────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataUsuario((prev) => ({ ...prev, [name]: value }));
  };

  // ─────────────────────────────────────────────
  // PASO 1: Validar email (sin password)
  // `nextRaw` es el ?next= que traía la URL (página de origen). Se propaga
  // al paso 2 para volver tras el login; si no hay, va al inicio.
  // ─────────────────────────────────────────────
  const handleValidateEmail = async (e, nextRaw = null) => {
    e.preventDefault();
    setLoadingAuth(true);

    try {
      // Validar que el email no esté vacío
      if (!formDataUsuario.email.trim()) {
        toast.error("Por favor ingresa tu email", { position: "bottom-right" });
        setLoadingAuth(false);
        return;
      }

      const res = await apiBackend("/auth/check-email", "POST", {
        email: formDataUsuario.email,
      });

      if (!res.success) {
        toast.error(res.error || "Error al validar el email", {
          position: "bottom-right",
        });
        setLoadingAuth(false);
        return;
      }

      // Email válido - agregar a URL y avanzar al paso 2 (conservando ?next=)
      const destino = getSafeNext(nextRaw);
      const query = `/login?email=${encodeURIComponent(formDataUsuario.email)}${destino ? `&next=${encodeURIComponent(destino)}` : ""}`;
      router.push(query);
    } catch (error) {
      toast.error("Error de conexión. Intenta nuevamente.", {
        position: "bottom-right",
      });
      console.error("❌ Error validando email:", error);
    } finally {
      setLoadingAuth(false);
    }
  };

  // ─────────────────────────────────────────────
  // PASO 2: Login con email + contraseña
  // Tras el login vuelve a la página de origen (?next=) o al inicio.
  // ─────────────────────────────────────────────
  const handleLogin = async (e, nextRaw = null) => {
    e.preventDefault();
    setLoadingAuth(true);

    try {
      iniciarCarga();

      // Validar que la contraseña no esté vacía
      if (!formDataUsuario.password.trim()) {
        toast.error("Por favor ingresa tu contraseña", {
          position: "bottom-right",
        });
        setLoadingAuth(false);
        return;
      }

      const res = await apiBackend("/auth/login", "POST", {
        email: formDataUsuario.email,
        password: formDataUsuario.password,
      });

      if (!res.success) {
        toast.error(res.error || "Credenciales incorrectas", {
          position: "bottom-right",
        });
        setLoadingAuth(false);
        return;
      }

      // Segundo factor: el usuario tiene el email verificado. El backend
      // envió un OTP al correo y aún no hay sesión: avanzar al paso OTP
      // conservando ?next= para volver tras verificar.
      if (res.data?.requiereOTP) {
        const destino = getSafeNext(nextRaw);
        const query = `/login?email=${encodeURIComponent(formDataUsuario.email)}&otp=1${destino ? `&next=${encodeURIComponent(destino)}` : ""}`;
        toast.success(
          res.message || "Te enviamos un código de verificación a tu correo.",
          { position: "bottom-right" },
        );
        router.push(query);
        return;
      }

      guardarSesion(res.data.usuario, res.data.accessToken);
      // await cargarPropiedades();
      resetFormDataUsuario();

      toast.success("¡Inicio de sesión exitoso!", { position: "bottom-right" });

      // Redirigir tras login: a la página de origen (?next=) o al inicio.
      // (el panel "/admin" general se eliminó por obsoleto)
      router.push(getSafeNext(nextRaw) ?? "/");
    } catch (error) {
      toast.error("Error inesperado", { position: "bottom-right" });
      console.error("❌ Error en login:", error);
    } finally {
      terminarCarga();
      setLoadingAuth(false);
    }
  };

  // ─────────────────────────────────────────────
  // PASO 2b: Verificar OTP del segundo factor
  // (solo usuarios con email verificado; el login devolvió requiereOTP)
  // ─────────────────────────────────────────────
  const handleVerificarOtp = async (codigo, nextRaw = null) => {
    setLoadingAuth(true);

    try {
      iniciarCarga();

      const codigoLimpio = String(codigo ?? "").trim();
      if (!/^\d{6}$/.test(codigoLimpio)) {
        toast.error("El código debe tener 6 dígitos numéricos.", {
          position: "bottom-right",
        });
        setLoadingAuth(false);
        return;
      }

      const res = await apiBackend("/auth/verificar-otp-login", "POST", {
        email: formDataUsuario.email,
        codigo: codigoLimpio,
      });

      if (!res.success) {
        toast.error(res.error || "Código incorrecto o expirado", {
          position: "bottom-right",
        });
        setLoadingAuth(false);
        return;
      }

      guardarSesion(res.data.usuario, res.data.accessToken);
      resetFormDataUsuario();

      toast.success("¡Inicio de sesión exitoso!", { position: "bottom-right" });
      router.push(getSafeNext(nextRaw) ?? "/");
    } catch (error) {
      toast.error("Error inesperado", { position: "bottom-right" });
      console.error("❌ Error verificando OTP:", error);
    } finally {
      terminarCarga();
      setLoadingAuth(false);
    }
  };

  // ─────────────────────────────────────────────
  // Reenviar OTP del segundo factor
  // ─────────────────────────────────────────────
  const handleReenviarOtp = async () => {
    try {
      const res = await apiBackend("/auth/reenviar-otp-login", "POST", {
        email: formDataUsuario.email,
      });

      if (!res.success) {
        toast.error(res.error || "No se pudo reenviar el código", {
          position: "bottom-right",
        });
        return false;
      }

      toast.success("Te enviamos un nuevo código a tu correo.", {
        position: "bottom-right",
      });
      return true;
    } catch (error) {
      toast.error("Error de conexión. Intenta nuevamente.", {
        position: "bottom-right",
      });
      console.error("❌ Error reenviando OTP:", error);
      return false;
    }
  };

  // ─────────────────────────────────────────────
  // Cambiar de email (volver al paso 1, conservando ?next= si lo había)
  // ─────────────────────────────────────────────
  const handleChangeEmail = (nextRaw = null) => {
    resetFormDataUsuario();
    router.push(buildLoginUrl(getSafeNext(nextRaw)));
  };

  // ─────────────────────────────────────────────
  // Registro de nuevo usuario (vuelve al origen o al inicio)
  // ─────────────────────────────────────────────
  const handleRegistro = async (e, nextRaw = null) => {
    e.preventDefault();

    const erroresPassword = validatePasswordRegistro(formDataUsuario.password);
    if (erroresPassword.length > 0) {
      toast.error(erroresPassword[0], { position: "bottom-right" });
      return;
    }

    setLoadingAuth(true);

    try {
      const res = await apiBackend("/auth/registro", "POST", {
        name: formDataUsuario.name,
        email: formDataUsuario.email,
        password: formDataUsuario.password,
        telefono: formDataUsuario.telefono,
      });

      if (!res.success) {
        const errorMsg = Array.isArray(res.error)
          ? res.error.join(", ")
          : res.error;
        toast.error(errorMsg || "Error al crear la cuenta", {
          position: "bottom-right",
        });
        return;
      }

      guardarSesion(res.data.usuario, res.data.accessToken);
      resetFormDataUsuario();

      toast.success("¡Cuenta creada correctamente!", {
        position: "bottom-right",
      });
      router.push(getSafeNext(nextRaw) ?? "/");
    } catch (error) {
      toast.error("Error inesperado", { position: "bottom-right" });
      console.error("❌ Error en registro:", error);
    } finally {
      setLoadingAuth(false);
    }
  };

  // ─────────────────────────────────────────────
  // Cerrar sesión
  // ─────────────────────────────────────────────
  const handleCerrarSesion = async () => {
    await cerrarSesion();
    toast.success("Sesión cerrada", { position: "bottom-right" });

    resetFormDataPropiedad();
    limpiarPropiedades();
    router.push("/login");
  };

  return {
    handleChange,
    handleValidateEmail,
    handleLogin,
    handleVerificarOtp,
    handleReenviarOtp,
    handleChangeEmail,
    handleRegistro,
    handleCerrarSesion,
    formDataUsuario,
    setFormDataUsuario,
  };
};

export default useAuth;
