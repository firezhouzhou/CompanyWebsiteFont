import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiLock, FiEye, FiEyeOff, FiLogIn } from 'react-icons/fi';
import { login as loginApi } from '../../api/api';
import { setToken, setUser } from '../../utils/auth';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ account: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await loginApi(formData);
      const data = response.data || response;
      setToken(data.token);
      setUser({
        username: data.username,
        nickname: data.nickname,
        role: data.role,
      });
      navigate('/');
      window.location.reload();
    } catch (err) {
      const msg =
        err.response?.data?.message || '登录失败，请检查账号和密码是否正确。';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        {/* Left visual */}
        <div className="login__visual">
          <div className="login__visual-content">
            <div className="login__visual-logo">E</div>
            <h2 className="login__visual-title">欢迎回来</h2>
            <p className="login__visual-text">
              登录您的企业账户，体验全方位的数字化服务
            </p>
            <div className="login__visual-features">
              <div className="login__visual-feature">个性化产品推荐</div>
              <div className="login__visual-feature">订阅行业资讯</div>
              <div className="login__visual-feature">专属技术支持</div>
            </div>
          </div>
          {/* Background decoration */}
          <div className="login__visual-shapes">
            <div className="login__visual-shape login__visual-shape--1"></div>
            <div className="login__visual-shape login__visual-shape--2"></div>
            <div className="login__visual-shape login__visual-shape--3"></div>
          </div>
        </div>

        {/* Right form */}
        <div className="login__form-side">
          <div className="login__form-wrapper">
            <h1 className="login__title">用户登录</h1>
            <p className="login__subtitle">
              还没有账户？{' '}
              <Link to="/register" className="login__link">
                立即注册
              </Link>
            </p>

            {error && <div className="login__error">{error}</div>}

            <form className="login__form" onSubmit={handleSubmit}>
              <div className="login__form-group">
                <label className="login__label" htmlFor="account">
                  邮箱 / 手机号
                </label>
                <div className="login__input-wrapper">
                  <FiUser className="login__input-icon" />
                  <input
                    type="text"
                    id="account"
                    name="account"
                    className="login__input"
                    placeholder="请输入邮箱或手机号"
                    value={formData.account}
                    onChange={handleChange}
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="login__form-group">
                <label className="login__label" htmlFor="password">
                  密码
                </label>
                <div className="login__input-wrapper">
                  <FiLock className="login__input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className="login__input"
                    placeholder="请输入密码"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="login__toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? '隐藏密码' : '显示密码'}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="login__options">
                <label className="login__remember">
                  <input type="checkbox" className="login__checkbox" />
                  <span>记住登录</span>
                </label>
                <a href="/forgot-password" className="login__forgot">
                  忘记密码？
                </a>
              </div>

              <button
                type="submit"
                className="btn btn--primary login__submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  '登录中...'
                ) : (
                  <>
                    <FiLogIn /> 登录
                  </>
                )}
              </button>
            </form>

            <div className="login__divider">
              <span className="login__divider-text">或使用以下方式登录</span>
            </div>

            <div className="login__social-buttons">
              <button className="login__social-btn login__social-btn--wechat">
                微信登录
              </button>
              <button className="login__social-btn login__social-btn--phone">
                手机验证码
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
