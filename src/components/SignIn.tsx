import { useState, useRef, useEffect } from 'react';
import { Eye, EyeOff, ArrowRight, Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';
import { WavyBackground } from './ui/wavy-background';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [animateBackground, setAnimateBackground] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Start background animation after a short delay
    const timer = setTimeout(() => {
      setAnimateBackground(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <WavyBackground 
      colors={['#0f2130', '#1a3954', '#f1c232', 'rgba(241, 194, 50, 0.5)']}
      backgroundFill="#071016"
      blur={10}
      speed="slow"
      waveWidth={100}
      containerClassName="h-screen w-full"
      waveOpacity={0.3}
    >
      <div className="sign-in-container">
        <div className="back-to-home-link">
          <Link to="/" className="flex -center gap-2 text-white hover:text-gold transition-colors">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>
        
        <div className="sign-in-card">
          {/* Glass effect overlay */}
          <div className="glass-effect"></div>
          
          {/* Left Panel with Logo and Brand */}
          <div className="brand-panel">
            <div className="brand-content">
              <div className="logo-container">
                <img src={logo} alt="Rise Up Mora Logo" className="logo" />
                <div className="logo-glow"></div>
              </div>
              <h2 className="brand-name">Rise Up Mora</h2>
              <p className="brand-tagline">A Step Towards The Future Industry</p>
              
              <div className="decorative-line"></div>
              <div className="decorative-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
            
            <div className="brand-pattern"></div>
          </div>
          
          {/* Right Panel with Form */}
          <div className="form-panel">
            <h1 className="form-title">Sign In</h1>
            
            <form className="sign-in-form">
              <div className="form-group">
                <label className={`form-label ${isEmailFocused || email ? 'active' : ''}`}>
                  Email
                </label>
                <div className="input-container">
                  <input 
                    ref={emailRef}
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
                    className="form-input"
                  />
                  <div className={`focus-indicator ${isEmailFocused ? 'active' : ''}`}></div>
                </div>
              </div>
              
              <div className="form-group">
                <label className={`form-label ${isPasswordFocused || password ? 'active' : ''}`}>
                  Password
                </label>
                <div className="input-container">
                  <input 
                    ref={passwordRef}
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    className="form-input"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="password-toggle"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <div className={`focus-indicator ${isPasswordFocused ? 'active' : ''}`}></div>
                </div>
              </div>
              
              <div className="forgot-password-container">
                <a href="#" className="forgot-password">Forgot password? Click Here!</a>
              </div>
              
              <button type="submit" className="sign-in-button">
                <span>Sign In</span>
                <ArrowRight size={18} className="button-icon" />
              </button>
              
              <div className="alt-actions">
                <span>Don't have an account? <a href="#" className="sign-up-link">Sign Up</a></span>
              </div>
            </form>
            
            <div className="form-footer">
              <div className="security-badge">
                <Lock size={14} />
                <span>Secure Sign-in</span>
              </div>
            </div>
          </div>
        </div>
        
        <style>{`
          .sign-in-container {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            position: relative;
          }
          
          /* Back to home link */
          .back-to-home-link {
            position: absolute;
            top: 20px;
            left: 20px;
            z-index: 10;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(5px);
            padding: 8px 16px;
            border-radius: 20px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.18);
          }
          
          .back-to-home-link:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
            background: rgba(255, 255, 255, 0.15);
          }
          
          /* Card with glass effect */
          .sign-in-card {
            display: flex;
            width: 100%;
            max-width: 900px;
            min-height: 500px;
            border-radius: 20px;
            position: relative;
            overflow: hidden;
            isolation: isolate;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
            border: 1px solid rgba(255, 255, 255, 0.18);
            z-index: 1;
          }
          
          .glass-effect {
            position: absolute;
            inset: 0;
            backdrop-filter: blur(16px);
            background: rgba(255, 255, 255, 0.07);
            z-index: -1;
          }
          
          /* Brand Panel Styles */
          .brand-panel {
            flex: 0 0 40%;
            background-color: rgba(17, 39, 53, 0.5);
            color: white;
            display: flex;
            flex-direction: column;
            position: relative;
            overflow: hidden;
            padding: 2rem;
            border-right: 1px solid rgba(255, 255, 255, 0.18);
          }
          
          .brand-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            height: 100%;
            z-index: 2;
          }
          
          .logo-container {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: linear-gradient(45deg, #f1c232, #f8d66d);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
            position: relative;
            box-shadow: 0 8px 25px rgba(241, 194, 50, 0.3);
            animation: float 6s ease-in-out infinite;
          }
          
          .logo {
            width: 70px;
            height: 70px;
            object-fit: contain;
            transform: scale(1.2);
          }
          
          .logo-glow {
            position: absolute;
            width: 150%;
            height: 150%;
            background: radial-gradient(circle, rgba(241, 194, 50, 0.5) 0%, transparent 70%);
            animation: pulse 3s infinite alternate;
            border-radius: 50%;
            z-index: -1;
          }
          
          .brand-name {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 0.5rem;
            background: linear-gradient(45deg, #f1c232, #ffffff);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            position: relative;
          }
          
          .brand-tagline {
            color: rgba(255, 255, 255, 0.9);
            font-size: 14px;
            margin-bottom: 2rem;
          }
          
          .decorative-line {
            width: 40px;
            height: 3px;
            background: linear-gradient(90deg, #f1c232, transparent);
            margin-bottom: 1rem;
            border-radius: 3px;
          }
          
          .decorative-dots {
            display: flex;
            gap: 8px;
            margin-top: 0.5rem;
          }
          
          .decorative-dots span {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: #f1c232;
            opacity: 0.8;
          }
          
          .decorative-dots span:nth-child(1) {
            animation: blink 1.5s infinite 0.2s;
          }
          
          .decorative-dots span:nth-child(2) {
            animation: blink 1.5s infinite 0.4s;
          }
          
          .decorative-dots span:nth-child(3) {
            animation: blink 1.5s infinite 0.6s;
          }
          
          .brand-pattern {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: radial-gradient(circle at 20% 80%, rgba(241, 194, 50, 0.15) 0%, transparent 50%);
            z-index: 1;
          }
          
          /* Form Panel Styles with Glass Effect */
          .form-panel {
            flex: 1;
            padding: 3rem;
            display: flex;
            flex-direction: column;
            background-color: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(5px);
            position: relative;
            z-index: 2;
          }
          
          .form-title {
            font-size: 26px;
            font-weight: 700;
            color: white;
            margin-bottom: 2rem;
            position: relative;
          }
          
          .form-title::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -8px;
            width: 40px;
            height: 3px;
            background: linear-gradient(90deg, #f1c232, rgba(241, 194, 50, 0.3));
            border-radius: 2px;
            transition: width 0.3s ease;
          }
          
          .form-title:hover::after {
            width: 60px;
          }
          
          .sign-in-form {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            margin-bottom: 2rem;
          }
          
          .form-group {
            position: relative;
          }
          
          .form-label {
            position: absolute;
            top: 50%;
            left: 15px;
            transform: translateY(-50%);
            font-size: 16px;
            color: rgba(255, 255, 255, 0.7);
            pointer-events: none;
            transition: all 0.2s ease;
          }
          
          .form-label.active {
            top: -10px;
            left: 5px;
            font-size: 12px;
            color: #f1c232;
            font-weight: 500;
          }
          
          .input-container {
            position: relative;
          }
          
          .form-input {
            width: 100%;
            padding: 15px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            font-size: 16px;
            color: white;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(5px);
            outline: none;
            transition: all 0.3s ease;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          
          .form-input:focus {
            border-color: #f1c232;
            box-shadow: 0 0 0 2px rgba(241, 194, 50, 0.1);
            background: rgba(255, 255, 255, 0.1);
          }
          
          .focus-indicator {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 2px;
            background-color: #f1c232;
            transition: width 0.3s ease;
          }
          
          .focus-indicator.active {
            width: 100%;
          }
          
          .password-toggle {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            background: transparent;
            border: none;
            cursor: pointer;
            color: rgba(255, 255, 255, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s ease;
          }
          
          .password-toggle:hover {
            color: #f1c232;
          }
          
          .forgot-password-container {
            text-align: right;
            margin-top: -0.5rem;
          }
          
          .forgot-password {
            font-size: 13px;
            color: rgba(255, 255, 255, 0.6);
            text-decoration: none;
            transition: color 0.2s ease;
          }
          
          .forgot-password:hover {
            color: #f1c232;
          }
          
          .sign-in-button {
            margin-top: 1rem;
            padding: 14px;
            background: rgba(17, 39, 53, 0.8);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          }
          
          .sign-in-button:hover {
            background-color: #f1c232;
            color: #112735;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(241, 194, 50, 0.3);
            border-color: transparent;
          }
          
          .sign-in-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.2),
              transparent
            );
            transition: all 0.6s ease;
          }
          
          .sign-in-button:hover::before {
            left: 100%;
          }
          
          .button-icon {
            transition: transform 0.2s ease;
          }
          
          .sign-in-button:hover .button-icon {
            transform: translateX(4px);
          }
          
          .alt-actions {
            text-align: center;
            margin-top: 1.5rem;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
          }
          
          .sign-up-link {
            color: #f1c232;
            font-weight: 500;
            text-decoration: none;
            position: relative;
          }
          
          .sign-up-link::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -2px;
            width: 0;
            height: 2px;
            background-color: #f1c232;
            transition: width 0.3s ease;
          }
          
          .sign-up-link:hover::after {
            width: 100%;
          }
          
          .form-footer {
            margin-top: auto;
            display: flex;
            justify-content: center;
          }
          
          .security-badge {
            display: flex;
            align-items: center;
            gap: 5px;
            color: rgba(255, 255, 255, 0.6);
            font-size: 12px;
            padding: 5px 10px;
            border-radius: 15px;
            background-color: rgba(241, 194, 50, 0.1);
            backdrop-filter: blur(5px);
            border: 1px solid rgba(241, 194, 50, 0.1);
          }
          
          /* Animations */
          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          @keyframes pulse {
            0% {
              opacity: 0.4;
              transform: scale(0.95);
            }
            100% {
              opacity: 0.2;
              transform: scale(1.05);
            }
          }
          
          @keyframes blink {
            0%, 100% {
              opacity: 0.3;
              transform: scale(0.8);
            }
            50% {
              opacity: 0.8;
              transform: scale(1);
            }
          }
          
          /* Responsive styles */
          @media (max-width: 768px) {
            .sign-in-card {
              flex-direction: column;
              max-width: 480px;
            }
            
            .brand-panel {
              padding: 2rem 1rem;
              flex: 0 0 auto;
              min-height: 200px;
              border-right: none;
              border-bottom: 1px solid rgba(255, 255, 255, 0.18);
            }
            
            .form-panel {
              padding: 2rem 1.5rem;
            }
            
            .logo-container {
              width: 80px;
              height: 80px;
              margin-bottom: 1rem;
            }
            
            .logo {
              width: 60px;
              height: 60px;
            }
            
            .brand-name {
              font-size: 24px;
            }
            
            .form-title {
              margin-bottom: 1.5rem;
            }
          }
        `}</style>
      </div>
    </WavyBackground>
  );
};

export default SignIn;