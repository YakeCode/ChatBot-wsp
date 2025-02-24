import axios from 'axios';
import config from '../config/env.js';

class WhatsAppService {
  constructor() {
    this.BASE_URL = `https://graph.facebook.com/${config.API_VERSION}/${config.BUSINESS_PHONE}/messages`;
  }

  async sendMessage(to, body, messageId) {
    try {
      await axios({
        method: 'POST',
        url: this.BASE_URL,
        headers: {
          Authorization: `Bearer ${config.API_TOKEN}`,
        },
        data: {
          messaging_product: 'whatsapp',
          to,
          text: { body },
          //context: {
          //  message_id: messageId,
          //},
        },
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  async markAsRead(messageId) {
    try {
      await axios({
        method: 'POST',
        url: this.BASE_URL,
        headers: {
          Authorization: `Bearer ${config.API_TOKEN}`,
        },
        data: {
          messaging_product: 'whatsapp',
          status: 'read',
          message_id: messageId,
        },
      });
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  }

  async sendInteractiveButtons(to, BodyText, buttons) {
    try {
      await axios({
        method: 'POST',
        url: this.BASE_URL,
        headers: {
          Authorization: `Bearer ${config.API_TOKEN}`,
        },
        data: {
          messaging_product: 'whatsapp',
          to,
          type: 'interactive',
          interactive: {
            type: 'button',
            body: { text: BodyText },
            action: {
              buttons: buttons
            }
          }
        },
      });
    } catch (error) {
      console.error('Error sending interactive buttons:', error);
    }
  }
}

export default new WhatsAppService();
