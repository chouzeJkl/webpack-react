import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Row, Form, Input } from 'antd'
import styles from './index.less'

const FormItem = Form.Item

@Form.create()
class Login extends PureComponent {
  handleOk = () => {
    const { form } = this.props
    const { validateFieldsAndScroll } = form
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      console.log(values);
    })
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <Fragment>
        <div className={styles.form}>
          <form>
            <FormItem hasFeedback>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Input
                  onPressEnter={this.handleOk}
                  placeholder="用户名"
                />
              )}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Input
                  type="password"
                  onPressEnter={this.handleOk}
                  placeholder="密码"
                />
              )}
            </FormItem>
            <Row>
              <Button
                type="primary"
                onClick={this.handleOk}
              >
               登录sssdddddgggff
              </Button>
            </Row>
          </form>
        </div>
      </Fragment>
    )
  }
}

Login.propTypes = {
  form: PropTypes.object,
}

export default Login
