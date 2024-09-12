const { SNSClient, SubscribeCommand } = require('@aws-sdk/client-sns');

// Configurando o cliente SNS com a região apropriada
const snsClient = new SNSClient({ region: 'us-east-1' });

// Função para inscrever um número de celular no tópico SNS
const subscribeSmsToSnsTopic = async (phoneNumber, topicArn) => {
  const params = {
    Protocol: 'sms',
    TopicArn: topicArn,
    Endpoint: phoneNumber, // Número de celular no formato internacional
  };

  try {
    const data = await snsClient.send(new SubscribeCommand(params));
    console.log('Número de celular inscrito com sucesso!', data);
    return data;
  } catch (error) {
    console.error('Erro ao inscrever número de celular:', error);
  }
};

// Função para inscrever um e-mail no tópico SNS
const subscribeEmailToSnsTopic = async (emailAddress, topicArn) => {
  const params = {
    Protocol: 'email',
    TopicArn: topicArn,
    Endpoint: emailAddress, // Endereço de e-mail
  };

  try {
    const data = await snsClient.send(new SubscribeCommand(params));
    if (data.SubscriptionArn === 'pending confirmation') {
      console.log('Endereço de e-mail inscrito com sucesso, aguarde a confirmação via e-mail.');
    } else {
      console.log('Endereço de e-mail inscrito com sucesso!', data);
    }
    return data;
  } catch (error) {
    console.error('Erro ao inscrever endereço de e-mail:', error);
  }
};


const topicArn = 'arn';
const phoneNumber = '+557999999999'; // Número de telefone no formato internacional
const emailAddress = 'teste@gmail.com'; // Endereço de e-mail

// Função principal
const main = async () => {
  try {
    // Inscrevendo o número de celular no tópico
    await subscribeSmsToSnsTopic(phoneNumber, topicArn);
    
    // Inscrevendo o e-mail no tópico
    await subscribeEmailToSnsTopic(emailAddress, topicArn);
  } catch (error) {
    console.error('Erro durante o processo de inscrição:', error);
  }
};

main();
