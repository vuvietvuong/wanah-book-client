 import React from 'react';
 import "./RegisterForm.css";
import {Form, Input, Button, notification} from 'antd'
import { register } from '../../../api/base/auth';
import { withRouter } from 'react-router-dom'
import Paths from '../../../routes/Paths';

class RegisterForm extends React.Component {
  state = {
    confirmDirty: false,
    messages: ''
  };

  validateNumberCharacter8To20 = (rule, value, callback) => {
    if (value.length < 8 && value > 20) {
      callback('Nhập từ 8-20 ký tự')
    }
    callback()
  }

  validateNumberCharacter8To30 = (rule, value, callback) => {
    if (value.length < 8 && value > 30) {
      callback('Nhập từ 8-30 ký tự')
    } else {
      callback()
    }   
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['passwordConfirm'], { force: true });
    }
    callback();
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Mật khẩu không trùng khớp');
    } else {
      callback();
    }
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  submitRegister = async (values) => {
    const {success, data} = await register(values)
    if (success) {
      notification['success']({
        message: 'Đăng ký thành công',
      });
      this.props.history.push(Paths.Login)
    } else {
      this.setState({
        message: data
      })
    }
  }
    

  handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.submitRegister(values)
        }
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="form" onSubmit={this.handleSubmit}>
        <div className="wrap-right">
          <div className="title-name">
            Chào mừng bạn đến với WannahBook
                </div>
          <div className="regiter-name">
            Tạo tài khoản
                </div>
                {
        this.state.message && 
          <div className="error-message">
          {this.state.message}
        </div>
      }
          <Form.Item style={{margin:"20px 0 0 0"}}>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
              {
                getFieldDecorator('first_name', {
                  rules: [
                    {
                      required: true,
                      message: "Nhập họ."
                    }
                  ]
                })(<Input placeholder="Họ"/>)
              }
            </Form.Item>
            <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}></span>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
            {
                getFieldDecorator('last_name', {
                  rules: [
                    {
                      required: true,
                      message: "Nhập tên."
                    }
                  ]
                })(<Input placeholder="Tên"/>)
              }
            </Form.Item>
          </Form.Item>
            <Form.Item>
                {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'E-mail không hợp lệ.',
                  },
                  {
                    required: true,
                    message: 'Nhập E-mail.',
                  },
                  {
                    validator: this.validateNumberCharacter8To30,
                  }
                ],
              })(<Input placeholder="Email"/>)}
            </Form.Item>
            <Form.Item hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Nhập Mật khẩu.',
                    },
                    {
                      validator: this.validateToNextPassword,
                    },
                    {
                      validator: this.validateNumberCharacter8To20,
                    }
                  ],
                })(<Input.Password placeholder="Mật khẩu"/>)}
          </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator('passwordConfirm', {
            rules: [
              {
                required: true,
                message: 'Nhập Mật khẩu.',
              },
              {
                validator: this.compareToFirstPassword,
              },
              {
                validator: this.validateNumberCharacter8To20,
              }
            ],
          })(<Input.Password placeholder="Nhập lại mật khẩu" onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
          
          <div className="footer-register">
            <div className="login">
              <a href="/login">Đăng nhập</a>
            </div>
              <Button type="primary" htmlType="submit" style={{ height:"35px", marginRight:"50px"}}>
                Đăng ký
            </Button> 
          </div>
        </div>
        <div className="wrap-left">
          <div className="logo-book"></div>
          <div className="message">
            <p>
              Hãy tạo một tài khoản để có những trải nghiệm tuyệt vời tại mạng xã hội
                    </p>
            <p className="name">WannahBook</p>
          </div>
        </div>
      </Form>
    )
  }
}

RegisterForm = Form.create({ name: 'register' })(RegisterForm);
export default withRouter(RegisterForm);




