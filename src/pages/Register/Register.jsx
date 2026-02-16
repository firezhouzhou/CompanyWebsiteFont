import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiPhone,
  FiUserPlus,
  FiCheckCircle,
} from 'react-icons/fi';
import { register as registerApi } from '../../api/api';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const validate = () => {
    if (formData.password.length < 6) {
      setError('密码长度不能少于6位');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      return false;
    }
    if (!agreed) {
      setError('请阅读并同意用户协议和隐私政策');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    setIsLoading(true);
    try {
      await registerApi({
        nickname: formData.nickname,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      setIsSuccess(true);
    } catch (err) {
      const msg =
        err.response?.data?.message || '注册失败，请稍后再试。';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------- Success View ---------- */
  if (isSuccess) {
    return (
      <div className="register">
        <div className="register__success-container">
          <FiCheckCircle className="register__success-icon" />
          <h1 className="register__success-title">注册成功！</h1>
          <p className="register__success-text">
            您的账户已成功创建，请使用注册邮箱登录。
          </p>
          <Link to="/login" className="btn btn--primary register__success-btn">
            前往登录
          </Link>
        </div>
      </div>
    );
  }

  /* ---------- Registration Form ---------- */
  return (
    <div className="register">
      <div className="register__container">
        {/* Left visual */}
        <div className="register__visual">
          <div className="register__visual-content">
            <div className="register__visual-logo">E</div>
            <h2 className="register__visual-title">加入我们</h2>
            <p className="register__visual-text">
              创建企业账户，开启您的数字化之旅
            </p>
            <ul className="register__visual-benefits">
              <li className="register__visual-benefit">
                <FiCheckCircle />
                <span>获取专属产品优惠和试用资格</span>
              </li>
              <li className="register__visual-benefit">
                <FiCheckCircle />
                <span>订阅行业趋势报告和白皮书</span>
              </li>
              <li className="register__visual-benefit">
                <FiCheckCircle />
                <span>享受一对一技术支持服务</span>
              </li>
              <li className="register__visual-benefit">
                <FiCheckCircle />
                <span>参与线上线下技术交流活动</span>
              </li>
            </ul>
          </div>
          <div className="register__visual-shapes">
            <div className="register__visual-shape register__visual-shape--1"></div>
            <div className="register__visual-shape register__visual-shape--2"></div>
          </div>
        </div>

        {/* Right form */}
        <div className="register__form-side">
          <div className="register__form-wrapper">
            <h1 className="register__title">创建账户</h1>
            <p className="register__subtitle">
              已有账户？{' '}
              <Link to="/login" className="register__link">
                立即登录
              </Link>
            </p>

            {error && <div className="register__error">{error}</div>}

            <form className="register__form" onSubmit={handleSubmit}>
              <div className="register__form-group">
                <label className="register__label" htmlFor="nickname">
                  昵称 <span className="register__required">*</span>
                </label>
                <div className="register__input-wrapper">
                  <FiUser className="register__input-icon" />
                  <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    className="register__input"
                    placeholder="请输入您的昵称"
                    value={formData.nickname}
                    onChange={handleChange}
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="register__form-group">
                <label className="register__label" htmlFor="email">
                  邮箱 <span className="register__required">*</span>
                </label>
                <div className="register__input-wrapper">
                  <FiMail className="register__input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="register__input"
                    placeholder="请输入您的邮箱地址"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="register__form-group">
                <label className="register__label" htmlFor="phone">
                  手机号码
                </label>
                <div className="register__input-wrapper">
                  <FiPhone className="register__input-icon" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="register__input"
                    placeholder="请输入您的手机号码"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="register__form-row">
                <div className="register__form-group">
                  <label className="register__label" htmlFor="password">
                    密码 <span className="register__required">*</span>
                  </label>
                  <div className="register__input-wrapper">
                    <FiLock className="register__input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      className="register__input"
                      placeholder="至少6位密码"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      className="register__toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? '隐藏密码' : '显示密码'}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                <div className="register__form-group">
                  <label className="register__label" htmlFor="confirmPassword">
                    确认密码 <span className="register__required">*</span>
                  </label>
                  <div className="register__input-wrapper">
                    <FiLock className="register__input-icon" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      className="register__input"
                      placeholder="请再次输入密码"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="register__toggle-password"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? '隐藏密码' : '显示密码'}
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="register__agreement">
                <label className="register__agreement-label">
                  <input
                    type="checkbox"
                    className="register__checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <span>
                    我已阅读并同意{' '}
                    <a href="/terms" className="register__agreement-link">
                      用户协议
                    </a>{' '}
                    和{' '}
                    <a href="/privacy" className="register__agreement-link">
                      隐私政策
                    </a>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="btn btn--primary register__submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  '注册中...'
                ) : (
                  <>
                    <FiUserPlus /> 创建账户
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
