import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import * as firebaseConfig from './firebase.config.json';
import * as firebase from 'firebase-admin';
import { PrismaService } from '../services/prisma.service';
import { FullUser } from '../types';

const firebase_params = {
  type: firebaseConfig.type,
  projectId: firebaseConfig.project_id,
  privateKeyId: firebaseConfig.private_key_id,
  privateKey: firebaseConfig.private_key,
  clientEmail: firebaseConfig.client_email,
  clientId: firebaseConfig.client_id,
  authUri: firebaseConfig.auth_uri,
  tokenUri: firebaseConfig.token_uri,
  authProviderX509CertUrl: firebaseConfig.auth_provider_x509_cert_url,
  clientC509CertUrl: firebaseConfig.client_x509_cert_url,
};

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth',
) {
  private defaultApp: firebase.app.App;
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
    });
  }
  async validate(token: string) {
    const decodedToken = await this.defaultApp
      .auth()
      .verifyIdToken(token, true)
      .catch((err) => {
        throw new UnauthorizedException(err.message);
      });

    if (!decodedToken) {
      throw new UnauthorizedException();
    }

    const uid = decodedToken.uid;
    console.log('UID:', uid);

    const user: FullUser = await this.prisma.user.findUnique({
      where: {
        id: uid,
      },
      select: {
        id: true,
        email: true,
        name: true,
        assignments: {
          select: {
            course: {
              select: {
                id: true,
                name: true,
                color: true,
              },
            },
            completed: true,
            id: true,
            title: true,
            description: true,
            dueDate: true,
          },
        },
        courses: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
    });

    console.log('USER: ', user);

    return user;
  }
}
