class ErroBase extends Error {
  constructor(msg = "Erro interno do servidor", status = 500) {
    super();
    this.msg = msg;
    this.status = status;
  }

  enviarResposta(res) {
    res.status(this.status).send({
      mensagem: this.msg,
      status: this.status,
    });
  }
}

export default ErroBase;
