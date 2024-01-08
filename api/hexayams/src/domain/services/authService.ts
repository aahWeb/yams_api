import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import passwordValidator from 'password-validator';
import * as validator from 'email-validator';

import { sign } from 'jsonwebtoken';
import { UserRepository } from '../../infrastructure/repositories/userRepository';

import { loadEnvConfig } from '../../config/env';
const env = loadEnvConfig();

const SECRET_KEY = env.SECRET;  // Utiliser une variable d'environnement pour le secret
const passwordSchema = new passwordValidator().is().min(8).is().max(20).has().digits(); // Créer un schéma de validation pour le mot de passe

export const AuthService = {
  async login({ email, password }: { email: string; password: string }) {
    // Trouver l'utilisateur par email
    const users = await UserRepository.readUsers();
    const user = users.find(user => user.email === email);


    // Si l'utilisateur n'existe pas
    if (!user) {
        throw new Error("Identifiants incorrects");
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password as string);
    if (!isPasswordValid) {
      throw new Error("Identifiants incorrects");
    }

    // Générer un token JWT
    // ici, dans le payload, on stocke l'id de l'utilisateur, mais on pourrait stocker n'importe quelle donnée
    // le token est signé avec le secret et expire au bout d'une heure
    const token = sign({ _id: user.id }, SECRET_KEY, { expiresIn: '1h' });

    return { user, token };
  },

  async register({ name, email, password }: { name: string; email: string; password: string }) {
    if (name?.length < 3) {
        throw new Error("Le nom doit avoir au moins 3 caractères");
    }

    // Vérifier la validité de l'email spécifié avec le package email-validator
    if (!validator.validate(email)) {
      throw new Error("Email invalide");
    }

    // Vérifier la validité du mot de passe spécifié en début de fichier
    if (!passwordSchema.validate(password ?? '')) {
      throw new Error("Le mot de passe doit contenir entre 8 et 20 caractères et au moins 1 chiffre");
    }

    const users = await UserRepository.readUsers();
  
    // Vérifier si l'utilisateur existe déjà depuis le mock
    if (users.some(u => u.email === email)) {
      throw new Error("Email déjà utilisé");
    }

    // Hacher le mot de passe (asynchrone)
    const hashedPassword = await bcrypt.hash(password as string, 10);

    // Créer un nouvel utilisateur
    const newUser = { id: Date.now().toString(), name, email, password: hashedPassword };

    // Ajouter l'utilisateur au json (userRepository)
    users.push(newUser);
    await UserRepository.writeUsers(users);

    return newUser;
  },

  logout(req: Request, res: Response) {
    // Supprimer le cookie de session
    res.clearCookie('token');
  }
};