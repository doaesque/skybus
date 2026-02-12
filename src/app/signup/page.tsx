"use client";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

function SignupContent() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [isAgreed, setIsAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (submitError) setSubmitError("");
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(e.target.checked);
    setTouched({ ...touched, agreement: true });
  };

  const validate = (field: string, value: string) => {
    if (field === 'name') {
      if (!value.trim()) return "Nama lengkap wajib diisi";
      if (value.trim().length < 3) return "Nama minimal 3 karakter";
      return "";
    }
    if (field === 'email') {
      if (!value.trim()) return "Email wajib diisi";
      if (!/\S+@\S+\.\S+/.test(value)) return "Format email tidak valid";
      return "";
    }
    if (field === 'phone') {
      if (!value.trim()) return "Nomor telepon wajib diisi";
      if (value.length < 9) return "Nomor telepon minimal 9 digit";
      return "";
    }
    if (field === 'password') {
      if (!value.trim()) return "Kata sandi wajib diisi";
      if (value.length < 6) return "Kata sandi minimal 6 karakter";
      return "";
    }
    return "";
  };

  const getFieldError = (field: string) => {
    // @ts-ignore
    return validate(field, formData[field]);
  };

  const isFieldInvalid = (field: string) => {
    return touched[field] && getFieldError(field) !== "";
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched = {
      name: true,
      email: true,
      phone: true,
      password: true,
      agreement: true
    };
    setTouched(allTouched);

    const nameError = validate('name', formData.name);
    const emailError = validate('email', formData.email);
    const phoneError = validate('phone', formData.phone);
    const passwordError = validate('password', formData.password);
    const agreementError = !isAgreed ? "Anda harus menyetujui Syarat & Ketentuan" : "";

    if (nameError || emailError || phoneError || passwordError || agreementError) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const existingUsersJSON = localStorage.getItem("skybus_users");
      const existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];

      const emailExists = existingUsers.some((u: any) => u.email === formData.email);

      if (emailExists) {
        setLoading(false);
        setSubmitError("Email ini sudah terdaftar. Silakan login.");
        return;
      }

      const newUser = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: "user"
      };

      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem("skybus_users", JSON.stringify(updatedUsers));

      setLoading(false);
      router.push('/login');
    }, 1500);
  };

  const ErrorBubble = ({ message }: { message: string }) => (
    <div className="absolute top-full left-0 mt-2 w-full z-10 animate-in fade-in slide-in-from-top-1">
      <div className="bg-red-500 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-lg relative">
        <div className="absolute -top-1.5 left-4 w-3 h-3 bg-red-500 rotate-45"></div>
        {message}
      </div>
    </div>
  );

  const getInputClass = (isError: boolean) => {
    return `w-full px-4 py-3 rounded-xl text-sm font-semibold focus:outline-none transition dark:text-white ${
      isError
        ? "bg-red-50 dark:bg-red-900/10 border border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500"
        : "bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-blue-600 dark:focus:border-blue-500"
    }`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col font-sans text-slate-800 dark:text-slate-100 transition-colors">
      <div className="p-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="inline-block mb-4">
              <div className="w-8 h-8 bg-amber-500 rounded-md -skew-x-12 shadow-lg shadow-amber-500/40"></div>
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tight">Buat Akun Baru</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">Bergabung dan nikmati kemudahan memesan tiket.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6" noValidate>
            <div className="space-y-6">
              <div className="relative">
                <label className={`block text-xs font-bold uppercase mb-1 ${isFieldInvalid('name') ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}`}>Nama Lengkap</label>
                <input
                  name="name"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass(isFieldInvalid('name'))}
                  placeholder="John Doe"
                />
                {isFieldInvalid('name') && <ErrorBubble message={getFieldError('name')} />}
              </div>

              <div className="relative">
                <label className={`block text-xs font-bold uppercase mb-1 ${isFieldInvalid('email') || submitError ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}`}>Email</label>
                <input
                  name="email"
                  type="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass(isFieldInvalid('email') || !!submitError)}
                  placeholder="nama@email.com"
                />
                {(isFieldInvalid('email')) && <ErrorBubble message={getFieldError('email')} />}
                {submitError && !isFieldInvalid('email') && <ErrorBubble message={submitError} />}
              </div>

              <div className="relative">
                <label className={`block text-xs font-bold uppercase mb-1 ${isFieldInvalid('phone') ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}`}>Nomor Telepon</label>
                <div className="flex">
                  <span className={`px-4 py-3 border border-r-0 rounded-l-xl text-sm font-bold flex items-center ${isFieldInvalid('phone') ? 'bg-red-50 dark:bg-red-900/10 border-red-500 text-red-500' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-500'}`}>+62</span>
                  <input
                    name="phone"
                    type="tel"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border rounded-r-xl text-sm font-semibold focus:outline-none transition dark:text-white ${
                      isFieldInvalid('phone')
                        ? "bg-red-50 dark:bg-red-900/10 border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500"
                        : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:border-blue-600 dark:focus:border-blue-500"
                    }`}
                    placeholder="812345678"
                  />
                </div>
                {isFieldInvalid('phone') && <ErrorBubble message={getFieldError('phone')} />}
              </div>

              <div className="relative">
                <label className={`block text-xs font-bold uppercase mb-1 ${isFieldInvalid('password') ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}`}>Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClass(isFieldInvalid('password'))}
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {isFieldInvalid('password') && <ErrorBubble message={getFieldError('password')} />}
              </div>
            </div>

            <div className="relative">
              <div className="flex items-start gap-3 mt-1">
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={handleCheckboxChange}
                  className={`mt-1.2 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 ${touched.agreement && !isAgreed ? 'ring-2 ring-red-500' : ''}`}
                />
                <p className={`text-xs leading-tight ${touched.agreement && !isAgreed ? 'text-red-500 font-bold' : 'text-slate-500 dark:text-slate-400'}`}>
                  Saya menyetujui <Link href="/terms" target="_blank" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Syarat & Ketentuan</Link> serta <Link href="/privacy" target="_blank" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Kebijakan Privasi</Link>.
                </p>
              </div>
              {touched.agreement && !isAgreed && (
                 <div className="absolute top-full left-0 mt-2 w-full z-10 animate-in fade-in slide-in-from-top-1">
                  <div className="bg-red-500 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-lg relative">
                    <div className="absolute -top-1.5 left-4 w-3 h-3 bg-red-500 rotate-45"></div>
                    Anda harus menyetujui Syarat & Ketentuan
                  </div>
                </div>
              )}
            </div>

            <button type="submit" disabled={loading} className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-slate-200 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center gap-2 items-center">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "DAFTAR"}
            </button>
          </form>

          <div className="text-center text-sm font-bold text-slate-500 dark:text-slate-400">
            Sudah punya akun? <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">Masuk Saja</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SignupContent />
    </Suspense>
  );
}
