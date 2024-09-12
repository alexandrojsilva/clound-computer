// Importando o cliente SNS
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');

// Configurando o cliente SNS
const snsClient = new SNSClient({ region: 'us-east-1' });

// Função para publicar mensagem em um tópico SNS
const publishToSnsTopic = async (message, topicArn, subject = '') => {
  const params = {
    Message: message,
    TopicArn: topicArn,
    Subject: subject, // Assunto para o e-mail
  };

  try {
    const result = await snsClient.send(new PublishCommand(params));
    console.log('Mensagem enviada com sucesso!', result);
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
  }
};

const topicArn = 'arn';
const message = 'Este é um teste de envio de mensagem para um tópico SNS3!';


const main = async () => {
  try {
    await publishToSnsTopic(message, topicArn, 'hello word');
  } catch (error) {
    console.error('Erro durante o processo de publicação:', error);
  }
};


main();
