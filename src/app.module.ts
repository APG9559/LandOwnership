/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertiesModule } from './properties/properties.module';
import { PartiesModule } from './parties/parties.module';
import { DeedsModule } from './deeds/deeds.module';
import { DeedPartiesModule } from './deed-parties/deed-parties.module';
import { OwnershipModule } from './ownership/ownership.module';
import { EncumbrancesModule } from './encumbrances/encumbrances.module';
import { DocumentsModule } from './documents/documents.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }), TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),

        ssl: {
          rejectUnauthorized: false, // REQUIRED for Neon
        },

        autoLoadEntities: true,

        synchronize: false, 
         migrationsRun: true, // ← auto-runs pending migrations on startup
        migrations: [__dirname + '/migrations/*.js'],
      }),
    }),

    AuthModule, UsersModule, DocumentsModule, EncumbrancesModule, OwnershipModule, DeedPartiesModule, DeedsModule, PartiesModule, PropertiesModule, RolesModule, DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
