import chalk from 'chalk'
import { Router } from 'express'
import Client from '../../Client'
import { Web } from '../Web'
import endpoints from '../../lib/endpoints.json'
import moment from 'moment-timezone'
export class BaseRoutes {
    router = Router()

    constructor(public client: Client, public web: Web) {
        this.web.app.use('/', this.router)
    }

    async start(): Promise<void> {
        this.router.get('/', (req, res) => {
            console.log(chalk.yellow('[WEB]'), chalk.blue(moment(Date.now() * 1000).format('DD/MM HH:mm:ss')), req.url)
            res.json({ message: 'Hi there' })
        })
        this.router.get('/qr', (req, res) => {
            if (!this.web.QR) {
                if (this.client.state === 'open') return res.json({ message: `You're already authenticated` })
                return res.json({ message: `QR code is not generated Yet` })
            }
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': this.web.QR.length
            })
            res.end(this.web.QR)
        })

        this.router.get('/state', (req, res) => {
            res.json({ state: this.client.state })
        })
        this.router.get('/endpoints', (req, res) => {
            res.json(endpoints)
        })

        this.router.get('/config', (req, res) => {
            console.log(chalk.yellow('[WEB]'), chalk.blue(moment(Date.now() * 1000).format('DD/MM HH:mm:ss')), req.url)
            res.json(this.client._config)
        })

        this.router.get('/user', (req, res) => {
            console.log(chalk.yellow('[WEB]'), chalk.blue(moment(Date.now() * 1000).format('DD/MM HH:mm:ss')), req.url)
            const json = req.query.jid ? this.client.contacts[String(req.query.jid)] || {} : this.client.user
            res.json(json)
        })

        this.router.get('/client', async (req, res) => {
            console.log(chalk.yellow('[WEB]'), chalk.blue(moment(Date.now() * 1000).format('DD/MM HH:mm:ss')), req.url)
            const query = req.query
            if (query?.state === this.connectionOptions[1]) {
                if (this.client.state === 'close')
                    return res.json({
                        message: 'The client is not connected to WhatsApp'
                    })
                this.client.close()
                return res.json({
                    message: 'WhatsApp Connection Has Been Closed',
                    connect: `${req.url.replace(this.connectionOptions[1], this.connectionOptions[0])}`
                })
            } else if (query?.state === this.connectionOptions[0]) {
                if (this.client.state === 'open')
                    return res.json({
                        message: 'The client is already connected to WhatsApp'
                    })
                await this.client.connect()
                return res.json({
                    message: 'Successfully Connected to Whatsapp'
                })
            }
            return res.json({ message: 'Invalid Query' })
        })

        this.router.get('/pfp', async (req, res) => {
            if (!req.query.id) return res.json({ message: 'Not Found' })
            return res.json({ pfp: await this.client.getPfp(req.query.id as string) })
        })
    }

    connectionOptions = ['on', 'off']
}
