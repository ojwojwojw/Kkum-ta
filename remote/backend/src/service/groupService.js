class GroupService {
  constructor(groupRepository) {
    this.groupRepository = groupRepository;
  }

  async updateName(uid, gkey, name) {
    const grpSet = await this.groupRepository.findAllByUserId(uid);

    if(!grpSet) return false;

    this.groupRepository.updateNameByUserIdAndGroupKey(uid, gkey, name);
  }
}