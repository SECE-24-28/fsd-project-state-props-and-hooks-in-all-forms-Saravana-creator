import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  // Inputs state
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  // Errors state
  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password strength visual indicator state
  const [strength, setStrength] = useState({
    width: '0%',
    colorClass: 'bg-rose-500',
    text: 'Strength: Enter password',
    textClass: 'text-slate-400',
    isValid: false
  });

  // Toast alert
  const triggerToast = (message, isError = false) => {
    const toast = document.createElement('div');
    const bgClass = isError ? 'bg-rose-500 text-white' : 'bg-teal-400 text-slate-900';
    toast.className = `fixed bottom-5 right-5 ${bgClass} font-bold px-6 py-4 rounded-lg shadow-2xl z-[9999] transition-all duration-300 transform translate-y-0 opacity-100 flex items-center gap-2`;
    toast.innerHTML = `<span>${message}</span>`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  };

  // RegExp matches
  const nameRegex = /^[a-zA-Z]+$/;
  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/;
  const mobileRegex = /^[6-9][0-9]{9}$/;

  // Validation functions
  const validateField = (name, value) => {
    let errMsg = '';
    
    if (name === 'firstname' || name === 'lastname') {
      if (!value.trim()) {
        errMsg = 'Field is required';
      } else if (!nameRegex.test(value.trim())) {
        errMsg = 'Only alphabetic letters are allowed';
      }
    }
    
    if (name === 'email') {
      if (!value.trim()) {
        errMsg = 'Email is required';
      } else if (!emailRegex.test(value.trim())) {
        errMsg = 'Email must contain string/numbers before @, string after @, and .com/.in TLD';
      }
    }
    
    if (name === 'mobile') {
      if (!value.trim()) {
        errMsg = 'Mobile number is required';
      } else if (!mobileRegex.test(value.trim())) {
        errMsg = 'Must start with 6-9 and have exactly 10 digits';
      }
    }

    if (name === 'confirmPassword') {
      if (!value) {
        errMsg = 'Please confirm your password';
      } else if (value !== formData.password) {
        errMsg = 'Passwords do not match';
      }
    }

    setErrors(prev => ({ ...prev, [name]: errMsg }));
    return errMsg === '';
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setFormData(prev => {
      const updated = { ...prev, [name]: val };
      
      // Real-time validations
      if (name !== 'password' && name !== 'terms') {
        validateField(name, val);
      }
      
      // Confirm password real-time check when password shifts
      if (name === 'password' && updated.confirmPassword) {
        let confirmErrMsg = val === updated.confirmPassword ? '' : 'Passwords do not match';
        setErrors(prevErrors => ({ ...prevErrors, confirmPassword: confirmErrMsg }));
      }
      
      return updated;
    });
  };

  // Evaluate password strength state on typing
  useEffect(() => {
    const password = formData.password;
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length === 0) {
      setStrength({
        width: '0%',
        colorClass: 'bg-rose-500',
        text: 'Strength: Enter password',
        textClass: 'text-slate-400',
        isValid: false
      });
      return;
    }

    if (password.length < 6) {
      setStrength({
        width: '25%',
        colorClass: 'bg-rose-500',
        text: 'Strength: Too Short (min 6 chars)',
        textClass: 'text-rose-500',
        isValid: false
      });
      return;
    }

    let points = 1;
    if (hasUpper) points += 1;
    if (hasNumber) points += 1;
    if (hasSpecial) points += 1;

    if (points <= 2) {
      setStrength({
        width: '50%',
        colorClass: 'bg-orange-500',
        text: 'Strength: Weak (Add upper/number/special)',
        textClass: 'text-orange-500',
        isValid: false
      });
    } else if (points === 3) {
      setStrength({
        width: '75%',
        colorClass: 'bg-yellow-400',
        text: 'Strength: Medium (Add missing criteria)',
        textClass: 'text-yellow-400',
        isValid: false
      });
    } else if (points === 4) {
      setStrength({
        width: '100%',
        colorClass: 'bg-teal-400',
        text: 'Strength: Strong (Perfect!)',
        textClass: 'text-teal-400',
        isValid: true
      });
    }
  }, [formData.password]);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    // Trigger validation on all fields
    const isFirstOk = validateField('firstname', formData.firstname);
    const isLastOk = validateField('lastname', formData.lastname);
    const isEmailOk = validateField('email', formData.email);
    const isMobileOk = validateField('mobile', formData.mobile);
    const isConfirmOk = validateField('confirmPassword', formData.confirmPassword);
    
    // Check password strength validation
    const isPassOk = strength.isValid;
    if (!isPassOk) {
      setErrors(prev => ({ ...prev, password: 'Must have >= 1 uppercase, >= 1 number, and >= 1 special character' }));
    } else {
      setErrors(prev => ({ ...prev, password: '' }));
    }

    if (!isFirstOk || !isLastOk || !isEmailOk || !isMobileOk || !isPassOk || !isConfirmOk) {
      triggerToast('Please fix all errors marked in red.', true);
      return;
    }

    if (!formData.terms) {
      triggerToast('You must agree to the Terms and Conditions.', true);
      return;
    }

    // Uniqueness & DB storage checks
    const email = formData.email.trim();
    const usersDatabase = JSON.parse(localStorage.getItem('eazeit_users')) || [];
    const alreadyExists = usersDatabase.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (alreadyExists) {
      triggerToast('This email is already registered! Please Login.', true);
      setErrors(prev => ({ ...prev, email: 'Email already registered!' }));
      return;
    }

    // Register user
    const newUser = {
      firstName: formData.firstname.trim(),
      lastName: formData.lastname.trim(),
      email: email,
      countryCode: '+91',
      mobile: formData.mobile.trim(),
      password: formData.password
    };

    usersDatabase.push(newUser);
    localStorage.setItem('eazeit_users', JSON.stringify(usersDatabase));
    sessionStorage.setItem('eazeit_active_user', JSON.stringify(newUser));

    triggerToast('Registration successful! Welcome to EAZEIT.', false);
    setTimeout(() => {
      navigate('/profile');
    }, 1200);
  };

  return (
    <>
      {/*  ===== SIGNUP FORM =====  */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-slate-900 min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-xl p-8 md:p-10 shadow-lg shadow-slate-900/50">
            
            <div className="flex flex-col items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl flex items-center justify-center font-serif font-extrabold text-2xl text-slate-900 shadow-md shadow-teal-400/20 mb-4">E</div>
                <h1 className="font-serif font-bold text-2xl text-white mb-1">Create Account</h1>
                <p className="text-slate-400 text-sm">Join EAZEIT for seamless grocery shopping</p>
            </div>

            <form id="signup-form" onSubmit={handleSignupSubmit} className="flex flex-col gap-5">
                
                {/*  First Name and Last Name in a 2-column grid  */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="signup-firstname" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">First Name</label>
                        <input 
                          type="text" 
                          id="signup-firstname" 
                          name="firstname" 
                          placeholder="First Name" 
                          required 
                          value={formData.firstname}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-slate-900 border ${errors.firstname ? 'border-rose-500' : 'border-slate-700'} rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:border-teal-400 transition-colors`} 
                        />
                        {errors.firstname && <span className="text-rose-500 text-[10px] mt-0.5">{errors.firstname}</span>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="signup-lastname" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Last Name</label>
                        <input 
                          type="text" 
                          id="signup-lastname" 
                          name="lastname" 
                          placeholder="Last Name" 
                          required 
                          value={formData.lastname}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-slate-900 border ${errors.lastname ? 'border-rose-500' : 'border-slate-700'} rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:border-teal-400 transition-colors`} 
                        />
                        {errors.lastname && <span className="text-rose-500 text-[10px] mt-0.5">{errors.lastname}</span>}
                    </div>
                </div>

                {/*  Email Address Field  */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="signup-email" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      id="signup-email" 
                      name="email" 
                      placeholder="Enter your email address" 
                      required 
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-slate-900 border ${errors.email ? 'border-rose-500' : 'border-slate-700'} rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:border-teal-400 transition-colors`} 
                    />
                    {errors.email && <span className="text-rose-500 text-[10px] mt-0.5">{errors.email}</span>}
                </div>

                {/*  Mobile Number Field  */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="signup-mobile" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Mobile Number</label>
                    <div className="flex gap-2">
                        <select id="signup-country" className="px-2 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-teal-400 transition-colors w-24">
                            <option value="+91">+91 (IN)</option>
                        </select>
                        <input 
                          type="tel" 
                          id="signup-mobile" 
                          name="mobile" 
                          placeholder="Mobile number" 
                          required 
                          value={formData.mobile}
                          onChange={handleInputChange}
                          className={`flex-1 px-4 py-3 bg-slate-900 border ${errors.mobile ? 'border-rose-500' : 'border-slate-700'} rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:border-teal-400 transition-colors`} 
                        />
                    </div>
                    {errors.mobile && <span className="text-rose-500 text-[10px] mt-0.5">{errors.mobile}</span>}
                </div>

                {/*  Password Field with View Eye Icon  */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="signup-password" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Password</label>
                    <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"} 
                          id="signup-password" 
                          name="password" 
                          placeholder="Create a password" 
                          required 
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 pr-10 bg-slate-900 border ${errors.password ? 'border-rose-500' : 'border-slate-700'} rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:border-teal-400 transition-colors`} 
                        />
                        <button 
                          type="button" 
                          id="toggle-signup-password" 
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-teal-400 transition-colors"
                        >
                            {showPassword ? (
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                              </svg>
                            ) : (
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            )}
                        </button>
                    </div>
                    
                    {/*  Password Strength Meter  */}
                    <div className="mt-1 flex flex-col gap-1">
                        <div className="flex h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                            <div id="strength-bar" className={`h-full ${strength.colorClass} transition-all duration-300`} style={{ width: strength.width }}></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                            <span id="strength-text" className={strength.textClass}>{strength.text}</span>
                            <span>Min 6 characters</span>
                        </div>
                    </div>
                    {errors.password && <span className="text-rose-500 text-[10px] mt-0.5">{errors.password}</span>}
                    <span className="text-slate-500 text-[9px] mt-0.5">Password criteria: At least 1 uppercase letter, 1 number, and 1 special symbol.</span>
                </div>
                
                {/*  Confirm Password Field  */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="signup-confirm-password" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Confirm Password</label>
                    <div className="relative">
                        <input 
                          type={showConfirmPassword ? "text" : "password"} 
                          id="signup-confirm-password" 
                          name="confirmPassword" 
                          placeholder="Confirm your password" 
                          required 
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 pr-10 bg-slate-900 border ${errors.confirmPassword ? 'border-rose-500' : 'border-slate-700'} rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:border-teal-400 transition-colors`} 
                        />
                        <button 
                          type="button" 
                          id="toggle-signup-confirm" 
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-teal-400 transition-colors"
                        >
                            {showConfirmPassword ? (
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                              </svg>
                            ) : (
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            )}
                        </button>
                    </div>
                    {errors.confirmPassword && <span className="text-rose-500 text-[10px] mt-0.5">{errors.confirmPassword}</span>}
                </div>

                {/*  Terms and Conditions checkbox  */}
                <div className="flex items-start gap-3 mt-1">
                    <input 
                      type="checkbox" 
                      id="signup-terms" 
                      name="terms" 
                      required 
                      checked={formData.terms}
                      onChange={handleInputChange}
                      className="mt-1 cursor-pointer accent-teal-400" 
                    />
                    <label htmlFor="signup-terms" className="text-xs text-slate-400 leading-relaxed cursor-pointer">
                        I agree to the <Link to="/terms" className="text-teal-400 hover:underline">Terms &amp; Conditions</Link> and <Link to="/privacy" className="text-teal-400 hover:underline">Privacy Policy</Link> of EAZEIT.
                    </label>
                </div>

                <button type="submit" className="w-full mt-2 bg-teal-400 hover:bg-teal-500 text-slate-900 font-bold text-sm px-6 py-3.5 rounded-lg transition-all duration-200 active:scale-95 shadow-lg shadow-teal-400/20">Register Account</button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-700/60 flex flex-col items-center gap-3 text-sm text-slate-400">
                <span>Already have an account? <Link to="/login" className="text-teal-400 hover:underline font-semibold">Login here</Link></span>
                <Link to="/" className="text-slate-300 hover:text-white transition-colors">Back to Home</Link>
            </div>

        </div>
      </main>
    </>
  );
};

export default Signup;