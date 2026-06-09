'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

export default function AuthPage() {

    const router = useRouter();
    const { resolvedTheme } = useTheme();

    const [mounted, setMounted] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {

        const newErrors: Record<string, string> = {};

        if (!formData.email)
            newErrors.email = "Email is required";

        else if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Invalid email";

        if (!formData.password)
            newErrors.password = "Password required";

        else if (formData.password.length < 6)
            newErrors.password = "Minimum 6 characters";

        if (!isLogin) {

            if (!formData.name)
                newErrors.name = "Name required";

            if (formData.password !== formData.confirmPassword)
                newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        await new Promise(r => setTimeout(r, 1200));

        router.push('/');

        setIsLoading(false);
    };

    if (!mounted) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">

                <div className="w-10 h-10 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"/>
            </div>
        )
    }

    const isDark = resolvedTheme === "dark";

    const pageBg = isDark ? "bg-[#050505]" : "bg-[#faf7f0]";

    const cardBg = isDark ? "bg-[#111111]" : "bg-[#fffdf8]";

    const text = isDark ? "text-[#f5f1e8]" : "text-[#171717]";

    const subtitle = isDark ? "text-[#d6c7a1]" : "text-[#6b4f00]";

    const label = isDark ? "text-[#d4af37]" : "text-[#7a5b00]";

    const input =`w-full px-4 py-3 rounded-xl border outline-none transition ${isDark ? "bg-black border-[#d4af37]/30 text-white placeholder-gray-600" : "bg-white border-[#b8860b]/30 text-black placeholder-gray-400"} focus:border-[#d4af37]`;

    const button =`w-full py-3 rounded-xl bg-[#8b0000] hover:bg-[#a30000] text-white font-semibold shadow-xl transition hover:scale-[1.02]`;

    const copyHeading = isLogin
        ? 'Your German future continues here.'
        : 'Create your bridge to Germany today.';

    const copyText = isLogin
        ? 'Sign in to continue with expert guidance for admissions, visas, scholarships, and student life in Germany.'
        : 'Sign up to unlock personalised support for every step on your study abroad journey.';

    const copyHighlights = isLogin
        ? ['Fast access to application status', 'Visa-ready document checklists', 'Trusted mentor support']
        : ['Profile building with expert feedback', 'Scholarship tracking made easy', 'Step-by-step application support'];

    const copyOrder = isLogin ? 'lg:order-1' : 'lg:order-2';
    const formOrder = isLogin ? 'lg:order-2' : 'lg:order-1';

    return (
        <div className={`min-h-screen ${pageBg}`}>
            <div className="min-h-screen flex items-center justify-center px-5 py-10">
                <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                    <motion.div
                        initial={{ opacity: 0, x: isLogin ? -40 : 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        className={`${copyOrder} rounded-[2rem] ${cardBg} border border-[#d4af37]/20 p-10 shadow-[0_30px_90px_rgba(0,0,0,0.18)]`}
                    >
                        <div className="mb-8 max-w-lg">
                            <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37] mb-4">
                                EuroZiel Advantage
                            </p>
                            <h1 className={`text-4xl font-semibold leading-tight ${text}`}>
                                {copyHeading}
                            </h1>
                            <p className={`${subtitle} mt-6 text-base leading-8`}>
                                {copyText}
                            </p>
                        </div>
                        <div className="space-y-4">
                            {copyHighlights.map((item) => (
                                <div key={item} className="flex items-start gap-3">
                                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-[#d4af37]" />
                                    <p className={`${text} text-sm leading-6`}>{item}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: isLogin ? 40 : -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        className={`${formOrder} relative w-full max-w-xl lg:max-w-none`}
                    >
                        <div className="absolute -inset-2 bg-[#d4af37] blur-3xl opacity-10 rounded-3xl" />
                        <div className={`relative ${cardBg} border border-[#d4af37]/30 rounded-3xl p-8 shadow-[0_25px_80px_rgba(0,0,0,0.5)]`}>
                            <div className="text-center mb-8">
                            <div className="mx-auto w-20 h-20 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-5">
                                <svg
                                    className="w-10 h-10 text-[#d4af37]"
                                    fill="none"
                                    viewBox="0 0 32 32"
                                >
                                    <rect
                                        x="5"
                                        y="5"
                                        width="22"
                                        height="24"
                                        rx="2"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <circle
                                        cx="22"
                                        cy="17"
                                        r="1.5"
                                        fill="#8b0000"
                                    />
                                </svg>
                            </div>
                            <h1 className={`text-3xl font-bold ${text}`}>
                                {
                                    isLogin
                                        ?
                                        "Welcome Back"
                                        :
                                        "Create Account"
                                }
                            </h1>
                            <p className={`${subtitle} mt-2 text-sm`}>
                                {
                                    isLogin
                                        ?
                                        "Enter your details to continue"
                                        :
                                        "Join our premium platform"
                                }
                            </p>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            {!isLogin &&
                                <div>
                                    <label className={label}>
                                        Full Name
                                    </label>
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={input}
                                        placeholder="John Doe"
                                    />
                                </div>
                            }
                            <div>
                                <label className={label}>
                                    Email
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={input}
                                    placeholder="email@example.com"
                                />
                            </div>
                            <div>
                                <label className={label}>
                                    Password
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={input}
                                    placeholder="••••••••"
                                />
                            </div>
                            {!isLogin &&
                                <div>
                                    <label className={label}>
                                        Confirm Password
                                    </label>
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={input}
                                        placeholder="••••••••"
                                    />
                                </div>
                            }
                            {
                                isLogin &&
                                <div className="text-right">
                                    <button
                                        type="button"
                                        className="text-[#d4af37] text-sm"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            }
                            <button
                                disabled={isLoading}
                                className={button}
                            >
                                {
                                    isLoading
                                        ?
                                        "Loading..."
                                        :
                                        isLogin
                                            ?
                                            "Sign In"
                                            :
                                            "Create Account"
                                }
                            </button>
                        </form>
                        <div className="mt-6 text-center text-sm">
                            <span className={subtitle}>
                                {
                                    isLogin
                                        ?
                                        "Don't have an account? "
                                        :
                                        "Already registered? "
                                }
                            </span>
                            <button
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setErrors({});
                                }}
                                className="text-[#d4af37] font-semibold"
                            >
                                {
                                    isLogin
                                        ?
                                        "Create Account"
                                        :
                                        "Sign In"
                                }
                            </button>
                        </div>
                        <div className="mt-6 pt-5 border-t border-[#d4af37]/20 text-center text-xs text-gray-500">
                            Premium Secure Access
                        </div>
                    </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}