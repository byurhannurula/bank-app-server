exports.errorData = err => {
  if (err.inner.length > 1) {
    const obj = []
    for (let i = 0; i < err.inner.length; i++) {
      obj.push({
        path: err.inner[i].path,
        message: err.inner[i].errors[0],
      })
    }
    return obj
  }

  return {
    path: err.inner[0].path,
    message: err.inner[0].errors[0],
  }
}

exports.responseData = res => {
  return res === 'ok'
    ? {
        code: '200',
        status: 'OK',
        message: 'Успешно изпълнена транзакция.',
      }
    : {
        code: '400',
        status: 'Fail',
        message: 'Грешка при изпълнение на заяваката!',
      }
}

exports.userData = data => {
  return {
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    avatar: data.avatar,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  }
}
