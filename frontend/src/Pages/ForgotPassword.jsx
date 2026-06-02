import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();

  // Step control: 'step1' | 'step2'
  const [step, setStep] = useState('step1');
  const [lookupEmail, setLookupEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // Step 2 state
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNew, setShowConfirmNew] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');

  const [strength, setStrength] = useState({
    width: '0%',
    colorClass: 'bg-rose-500',
    text: 'Strength: Enter password',
    textClass: 'text-slate-400',
    isValid: false
  });

  // Toast utility
  const triggerToast = (message, isError = false) => {
    const toast = document.createElement('div');
    const bgClass = isError ? 'bg-rose-500 text-white' : 'bg-teal-400 text-slate-900';
    toast.className = `fixed bottom-5 right-5 ${bgClass} font-bold px-6 py-4 rounded-lg shadow-2xl z-[9999] transition-all duration-300 transform translate-y-0 opacity-100 flex items-center gap-2`;
    toast.innerHTML = `<span>${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  // Password strength evaluator
  useEffect(() => {
    const p = newPassword;
    const hasUpper = /[A-Z]/.test(p);
    const hasNumber = /[0-9]/.test(p);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(p);

    if (p.length === 0) {
      setStrength({ width: '0%', colorClass: 'bg-rose-500', text: 'Strength: Enter password', textClass: 'text-slate-400', isValid: false });
      return;
    }
    if (p.length < 6) {
      setStrength({ width: '25%', colorClass: 'bg-rose-500', text: 'Strength: Too Short (min 6 chars)', textClass: 'text-rose-500', isValid: false });
      return;
    }
    let points = 1;
    if (hasUpper) points++;
    if (hasNumber) points++;
    if (hasSpecial) points++;

    if (points <= 2) setStrength({ width: '50%', colorClass: 'bg-orange-500', text: 'Strength: Weak', textClass: 'text-orange-500', isValid: false });
    else if (points === 3) setStrength({ width: '75%', colorClass: 'bg-yellow-400', text: 'Strength: Medium', textClass: 'text-yellow-400', isValid: false });
    else setStrength({ width: '100%', colorClass: 'bg-teal-400', text: 'Strength: Strong (Perfect!)', textClass: 'text-teal-400', isValid: true });
  }, [newPassword]);

  // Step 1: Email lookup handler
  const handleEmailLookup = (e) => {
    e.preventDefault();
    const email = lookupEmail.trim().toLowerCase();

    if (!email) {
      setEmailError('Please enter your email address.');
      return;
    }

    const usersDatabase = JSON.parse(localStorage.getItem('eazeit_users')) || [];
    const found = usersDatabase.some((u) => u.email.toLowerCase() === email);

    if (!found) {
      setEmailError('No account found with this email address.');
    } else {
      setEmailError('');
      setStep('step2');
    }
  };

  // Step 2: Password reset handler
  const handlePasswordReset = (e) => {
    e.preventDefault();

    let hasErrors = false;

    if (!strength.isValid) {
      setNewPasswordError('Must have ≥1 uppercase, ≥1 number, ≥1 special character.');
      hasErrors = true;
    } else {
      setNewPasswordError('');
    }

    if (!confirmNewPassword || confirmNewPassword !== newPassword) {
      setConfirmNewPasswordError('Passwords do not match.');
      hasErrors = true;
    } else {
      setConfirmNewPasswordError('');
    }

    if (hasErrors) return;

    // Update password in localStorage
    const usersDatabase = JSON.parse(localStorage.getItem('eazeit_users')) || [];
    const updatedDb = usersDatabase.map((u) => {
      if (u.email.toLowerCase() === lookupEmail.trim().toLowerCase()) {
        return { ...u, password: newPassword };
      }
      return u;
    });
    localStorage.setItem('eazeit_users', JSON.stringify(updatedDb));

    triggerToast('Password reset successful! Please login with your new password.', false);
    setTimeout(() => navigate('/login'), 1500);
  };

  return (
    <>
      {/*  ===== FORGOT PASSWORD MAIN =====  */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-slate-900 min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-md">

          {/* ─── STEP 1: Email Lookup ─── */}
          {step === 'step1' && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 md:p-10 shadow-lg shadow-slate-900/50">
              <div className="flex flex-col items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl flex items-center justify-center text-slate-900 shadow-md shadow-teal-400/20 mb-4">
                  <span className="text-xl">&#128274;</span>
                </div>
                <h1 className="font-serif font-bold text-2xl text-white mb-2">Forgot Password</h1>
                <p className="text-slate-400 text-sm text-center">Enter your registered email address and we'll let you reset your password.</p>
              </div>

              <form id="email-lookup-form" onSubmit={handleEmailLookup} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="forgot-email" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    id="forgot-email"
                    name="email"
                    placeholder="Enter your registered email"
                    required
                    value={lookupEmail}
                    onChange={(e) => { setLookupEmail(e.target.value); setEmailError(''); }}
                    className={`w-full px-4 py-3 bg-slate-900 border ${emailError ? 'border-rose-500' : 'border-slate-700'} rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:border-teal-400 transition-colors`}
                  />
                  {emailError && <span className="text-rose-500 text-[10px] mt-0.5">{emailError}</span>}
                </div>

                <button
                  type="submit"
                  id="lookup-btn"
                  className="w-full mt-2 bg-teal-400 hover:bg-teal-500 text-slate-900 font-bold text-sm px-6 py-3.5 rounded-lg transition-all duration-200 active:scale-95 shadow-lg shadow-teal-400/20"
                >
                  Verify Email &amp; Continue
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-700/60 flex flex-col items-center gap-3 text-sm text-slate-400">
                <span>Remember your password? <Link to="/login" className="text-teal-400 hover:underline font-semibold">Login here</Link></span>
                <Link to="/" className="text-slate-300 hover:text-white transition-colors">Back to Home</Link>
              </div>
            </div>
          )}

          {/* ─── STEP 2: New Password Entry ─── */}
          {step === 'step2' && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 md:p-10 shadow-lg shadow-slate-900/50">
              <div className="flex flex-col items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl flex items-center justify-center text-slate-900 shadow-md shadow-teal-400/20 mb-4">
                  <span className="text-xl">&#128274;</span>
                </div>
                <h2 className="font-serif font-bold text-2xl text-white mb-1">Set New Password</h2>
                <p className="text-teal-400 text-xs font-semibold">{lookupEmail}</p>
                <p className="text-slate-400 text-sm text-center mt-1">Create a strong new password for your account.</p>
              </div>

              <form id="reset-password-form" onSubmit={handlePasswordReset} className="flex flex-col gap-5">

                {/*  New Password  */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="new-password" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      id="new-password"
                      placeholder="Create a strong new password"
                      required
                      value={newPassword}
                      onChange={(e) => { setNewPassword(e.target.value); setNewPasswordError(''); }}
                      className={`w-full px-4 py-3 pr-10 bg-slate-900 border ${newPasswordError ? 'border-rose-500' : 'border-slate-700'} rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:border-teal-400 transition-colors`}
                    />
                    <button type="button" id="toggle-new-password" onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-teal-400 transition-colors">
                      {showNewPassword
                        ? <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                        : <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      }
                    </button>
                  </div>

                  {/*  Strength Meter  */}
                  <div className="mt-1 flex flex-col gap-1">
                    <div className="flex h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                      <div className={`h-full ${strength.colorClass} transition-all duration-300`} style={{ width: strength.width }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] font-medium">
                      <span className={strength.textClass}>{strength.text}</span>
                      <span className="text-slate-400">Min 6 characters</span>
                    </div>
                  </div>
                  {newPasswordError && <span className="text-rose-500 text-[10px] mt-0.5">{newPasswordError}</span>}
                </div>

                {/*  Confirm Password  */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="confirm-new-password" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmNew ? 'text' : 'password'}
                      id="confirm-new-password"
                      placeholder="Re-enter your new password"
                      required
                      value={confirmNewPassword}
                      onChange={(e) => { setConfirmNewPassword(e.target.value); setConfirmNewPasswordError(''); }}
                      className={`w-full px-4 py-3 pr-10 bg-slate-900 border ${confirmNewPasswordError ? 'border-rose-500' : 'border-slate-700'} rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:border-teal-400 transition-colors`}
                    />
                    <button type="button" id="toggle-confirm-new-password" onClick={() => setShowConfirmNew(!showConfirmNew)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-teal-400 transition-colors">
                      {showConfirmNew
                        ? <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                        : <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      }
                    </button>
                  </div>
                  {confirmNewPasswordError && <span className="text-rose-500 text-[10px] mt-0.5">{confirmNewPasswordError}</span>}
                </div>

                <button type="submit"
                  className="w-full mt-2 bg-teal-400 hover:bg-teal-500 text-slate-900 font-bold text-sm px-6 py-3.5 rounded-lg transition-all duration-200 active:scale-95 shadow-lg shadow-teal-400/20">
                  Reset Password
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  id="back-to-step1"
                  onClick={() => { setStep('step1'); setNewPassword(''); setConfirmNewPassword(''); setNewPasswordError(''); setConfirmNewPasswordError(''); }}
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  &larr; Use a different email
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
};

export default ForgotPassword;