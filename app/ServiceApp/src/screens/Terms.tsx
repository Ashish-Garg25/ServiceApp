/* eslint-disable react-native/no-inline-styles */
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenHeader from '../components/ScreenHeader';
import {useNavigation} from '@react-navigation/native';
import Back from '../assets/icons/Back';
import {COLORS} from '../utils/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Terms = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Terms & Conditions"
        navigation={navigation}
        renderPrefix={<Back />}
      />

      <View style={{flex: 1, width: wp('92%')}}>
        <ScrollView>
          <Text style={[styles.mainText, {marginTop: wp('4%')}]}>
            Terms and Conditions for Service App
          </Text>
          <Text style={styles.content}>
            These Mr. Tasker Global Terms of Service (the “Terms of Service” or
            the “Terms”) constitute a legally binding agreement between the User
            (defined below) of the Platform (defined below) (“you” or “your”)
            and Mr. Tasker, Inc. (together with its Affiliates (defined below),
            “Mr. Tasker”, “we”, “us” or “our”) governing your use of Mr.
            Tasker's website (www.Mr.Tasker.com) (together, the “Sites”), mobile
            applications (together, the “Apps”), and related services,
            information and communications (collectively referred to herein as
            the “Platform” or the “Mr. Tasker Platform”).
          </Text>
          <Text style={[styles.content, {fontWeight: '700'}]}>
            BY ACKNOWLEDGING THE TERMS OF SERVICE AND/OR ACCESSING AND USING THE
            PLATFORM, YOU EXPRESSLY ACKNOWLEDGE AND AGREE THAT YOU HAVE READ AND
            UNDERSTAND AND AGREE TO BE BOUND BY (WITHOUT LIMITATION OR
            QUALIFICATION), THE AGREEMENT (INCLUDING, ALL TERMS INCORPORATED
            HEREIN BY REFERENCE). IF YOU DO NOT AGREE TO BE BOUND BY THE
            AGREEMENT AND ABIDE BY ITS TERMS, YOU MAY NOT ACCESS OR USE THE
            PLATFORM.
          </Text>
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: COLORS.lightGrey,
            }}>
            <View
              style={{
                backgroundColor: COLORS.primaryLight1,
                padding: wp('2%'),
                marginVertical: wp('2%'),
              }}>
              <Text style={styles.mainText}>A. Online Marketplace</Text>
              <Text style={styles.content}>
                The Platform operates as an online web and app-based marketplace
                connecting Clients and Taskers. "Clients" are individuals or
                businesses seeking short-term services ("Tasks"), and "Taskers"
                are businesses providing these services. Both Clients and
                Taskers are referred to as "Users."
                {'\n\n'}
                Taskers are independent, operating under their own business
                names and terms. They set their own rates without deductions by
                the Platform. Taskers are free to maintain their clientele, work
                on other platforms, and choose which Clients to accept or
                reject. Clients engage directly with Taskers, and Taskers are
                independent contractors, not employees or agents of the
                Platform.
                {'\n\n'}
                Descriptions like "licensed," "vetted," or "background checked"
                indicate completion of registration processes and do not imply
                endorsement or certification by the Platform. Clients are
                responsible for verifying Taskers' qualifications and
                suitability.
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: COLORS.lightGrey,
            }}>
            <View
              style={{
                backgroundColor: COLORS.primaryLight1,
                padding: wp('2%'),
                marginVertical: wp('2%'),
              }}>
              <Text style={styles.mainText}>B. Platform Role</Text>
              <Text style={styles.content}>
                The Platform is not an employment agency, and the Platform
                provider (referred to as "Mr. Tasker") is not an employer of
                Users. Users are independent contractors and not employees,
                partners, or representatives of the Platform.{'\n\n'} Users
                acknowledge that the Platform does not supervise or control
                Taskers' work, including their locations, hours, or terms of
                work. Mr. Tasker does not manage the quality, legality, or any
                other aspect of Tasks performed by Users. Users do not act as
                agents for Mr. Tasker and cannot modify Mr. Tasker's fees.{' '}
                {'\n\n'} Mr. Tasker is not liable for tax withholding,
                insurance, or any other payments related to Users' use of the
                Platform. Taskers are solely responsible for taxes and
                contributions applicable to their income and any workers they
                engage.
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: COLORS.lightGrey,
            }}>
            <View
              style={{
                backgroundColor: COLORS.primaryLight1,
                padding: wp('2%'),
                marginVertical: wp('2%'),
              }}>
              <Text style={styles.mainText}>C. License</Text>
              <Text style={styles.content}>
                Users are granted a limited, non-transferable license to access
                and use the Platform and its content solely for personal use and
                Platform purposes. Any use beyond this requires prior written
                consent from Mr. Tasker. Users must comply with the Platform's
                Acceptable Use Policy.
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: COLORS.lightGrey,
            }}>
            <View
              style={{
                backgroundColor: COLORS.primaryLight1,
                padding: wp('2%'),
                marginVertical: wp('2%'),
              }}>
              <Text style={styles.mainText}>
                D. User Representations and Warranties
              </Text>
              <Text style={styles.content}>
                Users agree to comply with the Platform's terms, be of legal age
                in their jurisdiction, and have the authority to enter
                agreements on behalf of any entity they represent. Users must
                abide by applicable laws and respect others' privacy and
                property rights.
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: COLORS.lightGrey,
            }}>
            <View
              style={{
                backgroundColor: COLORS.primaryLight1,
                padding: wp('2%'),
                marginVertical: wp('2%'),
              }}>
              <Text style={styles.mainText}>
                E. Additional Tasker Representations and Warranties
              </Text>
              <Text style={styles.content}>
                Taskers represent that they operate independently, have
                necessary licenses and permits, maintain required insurance, and
                will perform Tasks professionally and safely. Taskers must
                promptly disclose relevant criminal convictions and comply with
                all legal requirements for their Tasks.
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: COLORS.lightGrey,
            }}>
            <View
              style={{
                backgroundColor: COLORS.primaryLight1,
                padding: wp('2%'),
                marginVertical: wp('2%'),
              }}>
              <Text style={styles.mainText}>2. Use of the Platform</Text>

              <Text style={[styles.mainText, {fontSize: hp('2%')}]}>
                A. Registration
              </Text>
              <Text style={styles.content}>
                Users must register and provide accurate information to use the
                Platform. They must promptly update Mr. Tasker about any
                changes. Failure to provide accurate information may result in
                account termination.
              </Text>

              <Text style={[styles.mainText, {fontSize: hp('2%')}]}>
                B. Account Security
              </Text>
              <Text style={styles.content}>
                Users are responsible for maintaining the confidentiality of
                their account information and must notify Mr. Tasker immediately
                of any unauthorized use or security breach.
              </Text>

              <Text style={[styles.mainText, {fontSize: hp('2%')}]}>
                C. Tasker Onboarding
              </Text>
              <Text style={styles.content}>
                Taskers may undergo background checks as permitted by law. They
                are responsible for obtaining necessary licenses and permits for
                their services. Clients are responsible for verifying Taskers'
                qualifications and compliance with legal requirements.
              </Text>

              <Text style={[styles.mainText, {fontSize: hp('2%')}]}>
                D. Service Agreement
              </Text>
              <Text style={styles.content}>
                After selecting a Tasker, Clients and Taskers form a legally
                binding Service Agreement through the Platform's chat feature.
                Mr. Tasker is not a party to this agreement and bears no
                liability for its terms or execution.
              </Text>

              <Text style={[styles.mainText, {fontSize: hp('2%')}]}>
                E. Other Parties
              </Text>
              <Text style={styles.content}>
                Taskers may engage assistants with Client approval, and Clients
                may appoint agents to manage Tasks on their behalf. Taskers and
                Clients are responsible for the actions of their assistants or
                agents.
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: COLORS.lightGrey,
            }}>
            <View
              style={{
                backgroundColor: COLORS.primaryLight1,
                padding: wp('2%'),
                marginVertical: wp('2%'),
              }}>
              <Text style={styles.mainText}>
                3. Fees, Billing, Invoicing, and Payment; Cancellation
              </Text>
              <Text style={styles.content}>
                Details regarding fees, invoicing, payment, and cancellation are
                outlined in the Fees, Payments, and Cancellation Supplemental
                Terms, applicable to all Platform transactions.
                {'\n\n'}• Mr. Tasker Fee {'\n'}• Task related Fee {'\n'}•
                Invoices {'\n'}• Payments {'\n'}• Cancellation {'\n'}• Refund{' '}
                {'\n'}• Fraud {'\n'}• Payment Service provider {'\n'}• Tax
                collection {'\n'}
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: COLORS.lightGrey,
            }}>
            <View
              style={{
                backgroundColor: COLORS.primaryLight1,
                padding: wp('2%'),
                marginVertical: wp('2%'),
              }}>
              <Text style={styles.mainText}>
                4. Contests and Promotional Codes
              </Text>
              <Text style={styles.content}>
                Mr. Tasker may offer promotional opportunities or contests,
                subject to specific terms and conditions. These promotions can
                be modified or terminated at any time without notice.
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: COLORS.lightGrey,
            }}>
            <View
              style={{
                backgroundColor: COLORS.primaryLight1,
                padding: wp('2%'),
                marginVertical: wp('2%'),
              }}>
              <Text style={styles.mainText}>5. Public Areas</Text>
              <Text style={styles.content}>
                The Platform may include public forums where Users can
                communicate. Users must use these areas appropriately and
                respect others' rights. Mr. Tasker is not responsible for User
                actions or content in public forums.
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: COLORS.lightGrey,
            }}>
            <View
              style={{
                backgroundColor: COLORS.primaryLight1,
                padding: wp('2%'),
                marginVertical: wp('2%'),
              }}>
              <Text style={styles.mainText}>
                6. Deactivation and Suspension
              </Text>
              <Text style={styles.content}>
                Mr. Tasker may suspend or deactivate accounts for breaches of
                the Agreement or suspected misconduct. Users may appeal such
                actions as per the Platform's procedures.
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: COLORS.lightGrey,
            }}>
            <View
              style={{
                backgroundColor: COLORS.primaryLight1,
                padding: wp('2%'),
                marginVertical: wp('2%'),
              }}>
              <Text style={styles.mainText}>7. Termination</Text>
              <Text style={styles.content}>
                Users can terminate their Agreement with Mr. Tasker at any time
                by ceasing Platform use. Mr. Tasker may terminate the Agreement
                for breaches or legal violations.
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: COLORS.lightGrey,
            }}>
            <View
              style={{
                backgroundColor: COLORS.primaryLight1,
                padding: wp('2%'),
                marginVertical: wp('2%'),
              }}>
              <Text style={styles.mainText}>
                8. User Generated Content; Feedback
              </Text>
              <Text style={styles.content}>
                Users are responsible for any content they generate on the
                Platform ("User Generated Content"). Mr. Tasker may monitor,
                modify, or remove User Generated Content as per its policies.
                Feedback on Taskers is subjective and not endorsed by Mr.
                Tasker.
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: COLORS.lightGrey,
            }}>
            <View
              style={{
                backgroundColor: COLORS.primaryLight1,
                padding: wp('2%'),
                marginVertical: wp('2%'),
              }}>
              <Text style={styles.mainText}>
                9. Intellectual Property Rights
              </Text>
              <Text style={styles.content}>
                The Platform and its content are owned by Mr. Tasker Inc. and
                protected by intellectual property laws. Users may not use
                Platform content beyond permitted uses without explicit consent.
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: COLORS.lightGrey,
            }}>
            <View
              style={{
                backgroundColor: COLORS.primaryLight1,
                padding: wp('2%'),
                marginVertical: wp('2%'),
              }}>
              <Text style={styles.mainText}>
                10. Links to Third-Party Websites
              </Text>
              <Text style={styles.content}>
                The Platform may contain links to third-party websites for
                reference. Mr. Tasker does not endorse these websites or their
                content and is not liable for their use or consequences.
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: COLORS.lightGrey,
            }}>
            <View
              style={{
                backgroundColor: COLORS.primaryLight1,
                padding: wp('2%'),
                marginVertical: wp('2%'),
              }}>
              <Text style={styles.mainText}>
                11. Copyright Complaints and Copyright Agent
              </Text>
              <Text style={styles.content}>
                Users can report copyright infringements to Mr. Tasker's
                designated Copyright Agent. Mr. Tasker will investigate and
                address such claims in accordance with applicable laws.
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: COLORS.lightGrey,
            }}>
            <View
              style={{
                backgroundColor: COLORS.primaryLight1,
                padding: wp('2%'),
                marginVertical: wp('2%'),
              }}>
              <Text style={styles.mainText}>12. Disclaimer of Warranties</Text>
              <Text style={styles.content}>
                Your use of the Platform is entirely at your own risk. The
                Platform and its underlying technology are provided on an "as
                is" and "as available" basis, without any warranties or
                conditions, whether express or implied. This includes, but is
                not limited to, warranties of merchantability, quality, fitness
                for a particular purpose, good and workmanlike services,
                compliance with any law or regulation, and non-infringement.
              </Text>

              <Text style={[styles.content, {fontWeight: '700'}]}>
                Limitations and Disclaimers:
              </Text>

              <Text style={styles.content}>
                Mr. Tasker and its affiliates, licensors, directors, officers,
                shareholders, agents, investors, subsidiaries, attorneys,
                representatives, insurers, employees, successors, and assigns
                (collectively, "Mr. Tasker Parties") expressly disclaim all
                representations and warranties, to the fullest extent permitted
                by law, regarding:
                {'\n\n'}• The timeliness, suitability, accuracy, reliability, or
                completeness of the Platform's content.
                {'\n'}• The results that may be achieved from using the Platform
                or any Task or service provided through it.
                {'\n'}• The Tasks or services provided by Users, including
                interactions or communications between Users (whether online or
                offline), and any Tasker's ability, professional qualifications,
                registration, or licensure.
                {'\n\n'}
                The Mr. Tasker Parties do not warrant that:
                {'\n'}
                {'\n'}• The Platform will be error-free or uninterrupted in
                access.
                {'\n'}• The Platform will be free from computer viruses, system
                failures, worms, Trojan horses, or other harmful components or
                malfunctions, including during hyperlinking to or from
                third-party websites.
                {'\n'}• Any product or service advertised or offered by any
                third party through the Platform or any hyperlinked website or
                service, including by any Tasker, is endorsed, guaranteed,
                recommended, or assumed to be the responsibility of Mr. Tasker.
                Mr. Tasker does not monitor transactions between you and
                third-party providers.
                {'\n'}
              </Text>

              <Text style={[styles.content, {fontWeight: '700'}]}>
                Legal Rights:
              </Text>
              <Text style={styles.content}>
                Certain jurisdictions may not allow the exclusion of implied
                warranties or limitations on certain rights, so the above
                exclusions and limitations may not apply to you fully. These
                terms provide you specific legal rights, and you may also have
                other rights that vary by jurisdiction. The disclaimers,
                exclusions, and limitations in these terms will not apply to the
                extent prohibited by applicable law.
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: COLORS.lightGrey,
            }}>
            <View
              style={{
                backgroundColor: COLORS.primaryLight1,
                padding: wp('2%'),
                marginVertical: wp('2%'),
              }}>
              <Text style={styles.mainText}>13. Limitation of Liability</Text>
              <Text style={styles.content}>
                By using the Platform, you acknowledge and agree that Mr. Tasker
                provides it under certain limitations of liability to you and
                third parties, as outlined in this Section and elsewhere in the
                Agreement.
              </Text>

              <Text style={[styles.content, {fontWeight: '700'}]}>
                Liability Limitations:
              </Text>

              <Text style={styles.content}>
                o the extent permitted by applicable law, under no circumstances
                will the Mr. Tasker Parties or their corporate partners be
                liable for any and all liabilities, claims, demands, damages
                (including direct, indirect, incidental, consequential,
                economic, special, or exemplary damages such as lost profits,
                loss of data or goodwill, service interruption, computer damage,
                system failure, failure to store information, and the cost of
                substitute products or services), expenses (including attorneys'
                fees and costs), losses, governmental obligations, suits, and
                controversies arising out of or related to the Platform or your
                or any other party's use of or inability to use the Platform,
                whether in contract, warranty, tort, or otherwise. This includes
                situations where the possibility of such damages was advised.
                {'\n\n'}
                You release the Mr. Tasker Parties and their corporate partners
                from the above liabilities to the extent permitted by law.
                However, nothing in this Agreement excludes or limits any
                liability or warranty that cannot be limited or excluded under
                applicable law. Some jurisdictions do not allow the exclusion of
                certain warranties or the limitation of incidental or
                consequential damages, so these limitations may not fully apply
                to you.{'\n\n'} If, despite the above exclusions, the Mr. Tasker
                Parties or their corporate partners are found liable, their
                aggregate liability will not exceed: (a) the total fees paid by
                you to Mr. Tasker in the six months preceding the claim if you
                are a Client; or (b) the total Task payments paid to you by
                Clients in the six months preceding the claim if you are a
                Tasker, to the extent permitted by applicable law.
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: COLORS.lightGrey,
            }}>
            <View
              style={{
                backgroundColor: COLORS.primaryLight1,
                padding: wp('2%'),
                marginVertical: wp('2%'),
              }}>
              <Text style={styles.mainText}>14. Indemnification</Text>
              <Text style={[styles.mainText, {fontSize: hp('2%')}]}>
                A. Client Indemnification
              </Text>
              <Text style={styles.content}>
                If you are a Client, you agree to indemnify, defend, and hold
                harmless Mr. Tasker and its affiliates from any liabilities
                incurred in connection with:
                {'\n\n'}• Your use of the Platform, including participation or
                inability to use it.
                {'\n'}• Your breach of the Agreement or violation of any law or
                third-party rights.
                {'\n'}• Your use of third-party links or websites on the
                Platform.
                {'\n'}• Any User Generated Content or Feedback submitted by you.
                {'\n'}• Acts or omissions of any Client Agents.
              </Text>

              <Text style={[styles.mainText, {fontSize: hp('2%')}]}>
                B. Tasker Indemnification
              </Text>
              <Text style={styles.content}>
                If you are a Tasker, you agree to indemnify, defend, and hold
                harmless Mr. Tasker and its affiliates from any liabilities
                incurred in connection with:
                {'\n\n'}• Your use of the Platform, including participation in
                Tasks.
                {'\n'}• Your breach of the Agreement or violation of any law or
                third-party rights.
                {'\n'}• Any User Generated Content or Feedback submitted by or
                about you.
                {'\n'}• Acts or omissions of any Tasker Assistants.
              </Text>

              <Text style={styles.content}>
                Mr. Tasker reserves the right to assume exclusive defense and
                control of any matter subject to your indemnification, and you
                agree not to settle any matter without Mr. Tasker's prior
                written consent.
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: COLORS.lightGrey,
            }}>
            <View
              style={{
                backgroundColor: COLORS.primaryLight1,
                padding: wp('2%'),
                marginVertical: wp('2%'),
              }}>
              <Text style={styles.mainText}>15. Dispute Resolution</Text>
              <Text style={styles.content}>
                In order to facilitate prompt resolution and reduce the expense
                of any dispute, controversy, or claim related to your use of the
                Platform, your relationship with Mr. Tasker, Tasks, or the
                Agreement (including previous versions) ("Dispute"), you are
                encouraged to attempt to resolve the Dispute amicably with Mr.
                Tasker before initiating any out-of-court settlement (such as
                mediation or arbitration) or legal proceeding. Informal
                negotiations should begin upon providing written notice. Your
                address for such notices will be the one associated with your
                account, with an email copy sent to the email address you have
                provided to Mr. Tasker. Mr. Tasker's address for such notices is
                specified accordingly.
              </Text>
            </View>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: COLORS.lightGrey,
            }}>
            <View
              style={{
                backgroundColor: COLORS.primaryLight1,
                padding: wp('2%'),
                marginVertical: wp('2%'),
              }}>
              <Text style={styles.mainText}>
                16. Consent to Electronic Signatures
              </Text>
              <Text style={styles.content}>
                By using the Platform, you agree: (a) to conduct transactions
                electronically through the Platform; (b) that your electronic
                signature holds the same legal effect, validity, and
                enforceability as a manual signature on paper; (c) that using a
                keypad, mouse, or similar device to select an item, button,
                icon, or take a similar action constitutes your electronic
                signature, as if manually signed by you; and (d) that no
                certification authority or third-party verification is necessary
                to validate your electronic signature, and the absence of such
                certification or verification does not affect its
                enforceability.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Terms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  mainText: {
    fontWeight: '700',
    fontSize: hp('2.2%'),
    lineHeight: 28,
    color: COLORS.primary,
    paddingVertical: wp('2%'),
  },

  subText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: hp('1.9%'),
    color: COLORS.black,
    paddingTop: wp('4%'),
  },

  content: {
    fontFamily: 'Inter-Regular',
    fontSize: hp('1.7%'),
    color: COLORS.black,
    paddingVertical: wp('2%'),
    lineHeight: 19.5,
  },
});
