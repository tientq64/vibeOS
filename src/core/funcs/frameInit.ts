function frameInit(this: MaybeTask) {
    if (!this) return

    const newSecretId: string = uniqId()

    this.secretId = newSecretId

    return {
        secretId: newSecretId
    }
}
